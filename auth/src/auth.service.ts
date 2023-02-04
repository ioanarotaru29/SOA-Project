import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import {
  catchError,
  lastValueFrom,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import {compareSync, hash} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await lastValueFrom(
        this.client.send({ role: 'user', cmd: 'get' }, { username }).pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(() => new RequestTimeoutException());
            }
            return throwError(err);
          }),
        ),
      );

      Logger.log(user?.password);
      if (user && compareSync(password, user?.password)) {
        return user;
      }

      return null;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
