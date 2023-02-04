import { Injectable, Logger } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, InsertResult, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  findOne(query: FindOneOptions<Booking>): Promise<Booking> {
    Logger.log(this.bookingRepository.findOne(query));
    return this.bookingRepository.findOne(query);
  }

  async createBooking(booking: any): Promise<InsertResult> {
    try {
      const bookingEntity = this.bookingRepository.create(booking);

      const res = await this.bookingRepository.insert(bookingEntity);

      Logger.log('createBooking - Created booking');

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
