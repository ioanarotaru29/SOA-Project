import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingModule } from './booking.module';

@Module({
  imports: [
    BookingModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'SOAProject',
      synchronize: false,
      entities: [Booking],
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
