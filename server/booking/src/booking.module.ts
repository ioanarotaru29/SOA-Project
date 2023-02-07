import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ClientsModule.register([
      {
        name: 'PAYMENT_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4040,
        },
      },
    ]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
