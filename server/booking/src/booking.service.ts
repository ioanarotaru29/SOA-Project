import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, InsertResult, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import {
  catchError,
  firstValueFrom,
  lastValueFrom,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @Inject('PAYMENT_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  findOne(query: FindOneOptions<Booking>): Promise<Booking> {
    Logger.log(this.bookingRepository.findOne(query));
    return this.bookingRepository.findOne(query);
  }

  async createBooking(data: any): Promise<any> {
    try {
      const bookingEntity = this.bookingRepository.create({
        packageId: data.packageId,
        userId: data.userId,
      });

      const res = await this.bookingRepository.insert(bookingEntity);

      Logger.log('createBooking - Created booking');

      return lastValueFrom(
        await this.client.send(
          { role: 'payment', cmd: 'create' },
          {
            externalProductId: res.identifiers.at(0).id,
            amount: data.amount,
            name: data.name,
            redirectUrl: data.redirectUrl,
          },
        ),
      );
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async updateBooking(data: any, signature: any): Promise<any> {
    try {
      // Logger.log(data, signature);
      const bookingId = await lastValueFrom(
        this.client
          .send({ role: 'payment', cmd: 'get_product' }, { data, signature })
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

      await this.bookingRepository.update(bookingId, { status: 'success' });
      return bookingId;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
