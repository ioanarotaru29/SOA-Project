import {
  BadRequestException,
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
import { compareSync } from 'bcrypt';

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

  async register(user) {
    Logger.log(user);
    try {
      const newUser = await lastValueFrom(
        this.client.send({ role: 'user', cmd: 'create' }, { user }).pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(() => new RequestTimeoutException());
            }
            return throwError(err);
          }),
        ),
      );
      Logger.log(newUser);
      if (!newUser) {
        return throwError(() => new BadRequestException());
      }

      const payload = { newUser, sub: newUser.id };
      return {
        id: newUser.id,
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
