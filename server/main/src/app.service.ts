import {
  BadRequestException,
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

    @Inject('BOOKING_CLIENT')
    private readonly bookingClient: ClientProxy,
  ) {}

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

  async createBooking(data: any): Promise<any> {
    Logger.log(data);
    const newBooking = await lastValueFrom(
      this.bookingClient.send({ role: 'booking', cmd: 'create' }, data).pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(err);
        }),
      ),
    );
    // Logger.log(newBooking);
    if (!newBooking) {
      return throwError(() => new BadRequestException());
    }
    return newBooking;
  }

  async updateBooking(data: any, signature: any): Promise<any> {
    Logger.log(data, signature);
    const res = await lastValueFrom(
      this.bookingClient.send(
        { role: 'booking', cmd: 'update' },
        { data, signature },
      ),
    );
    Logger.log(res);
  }
}
