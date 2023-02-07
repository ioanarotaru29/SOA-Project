import { Inject, Injectable, Logger } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, InsertResult, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

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
}
