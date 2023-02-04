import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Flight } from './entities/flight.entity';
import { FlightPackage } from './entities/flightPackage.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, FlightPackage])],
  providers: [FlightService],
  controllers: [FlightController],
})
export class FlightModule {}
