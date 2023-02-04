import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  catchError,
  lastValueFrom,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('FLIGHT_CLIENT')
    private readonly flightClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getFlights(queryData: any): Promise<any> {
    const flights = await lastValueFrom(
      this.flightClient.send({ role: 'flight', cmd: 'get' }, queryData).pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(err);
        }),
      ),
    );
    Logger.log(flights);
    return flights;
  }

  async getSources(): Promise<any> {
    const sources = await lastValueFrom(
      this.flightClient.send({ role: 'flight', cmd: 'getSources' }, {}).pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(err);
        }),
      ),
    );
    Logger.log(sources);
    return sources;
  }

  async getDestinations(): Promise<any> {
    const destinations = await lastValueFrom(
      this.flightClient
        .send({ role: 'flight', cmd: 'getDestinations' }, {})
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(() => new RequestTimeoutException());
            }
            return throwError(err);
          }),
        ),
    );
    Logger.log(destinations);
    return destinations;
  }
}
