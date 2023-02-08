import { Controller, Logger } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern } from '@nestjs/microservices';
import { Booking } from './entities/booking.entity';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern({ role: 'booking', cmd: 'create' })
  async createBooking(data: any): Promise<any> {
    Logger.log(data);
    try {
      return this.bookingService.createBooking(data);
      // return this.bookingService.findOne({
      //   where: { id: insertResult.identifiers.at(0).id },
      // });
    } catch (e) {
      Logger.log(e);
    }
    return null;
  }

  @MessagePattern({ role: 'booking', cmd: 'update' })
  async updateBooking({ data, signature }: any): Promise<Booking> {
    try {
      const updatedId = await this.bookingService.updateBooking(
        data,
        signature,
      );
      Logger.log(updatedId);
      return this.bookingService.findOne({
        where: { id: updatedId },
      });
    } catch (e) {
      Logger.log(e);
    }
    return null;
  }
}
