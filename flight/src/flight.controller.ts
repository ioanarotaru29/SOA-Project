import { Controller, Logger } from '@nestjs/common';
import { FlightService } from './flight.service';
import { MessagePattern } from '@nestjs/microservices';
import { Flight } from './entities/flight.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern({ role: 'flight', cmd: 'get' })
  getFlights(queryData: any): Promise<Flight[]> {
    Logger.log(queryData);
    let query = queryData;

    if (queryData.departureStart && queryData.departureEnd) {
      query = {
        ...query,
        departure: Between(queryData.departureStart, queryData.departureEnd),
      };
      delete query.departureStart;
      delete query.departureEnd;
    } else if (queryData.departureStart) {
      query = {
        ...query,
        departure: MoreThanOrEqual(queryData.departureStart),
      };
      delete query.departureStart;
    } else if (queryData.departureEnd) {
      query = {
        ...query,
        departure: LessThanOrEqual(queryData.departureEnd),
      };
      delete query.departureEnd;
    }
    return this.flightService.findAll(query);
  }

  @MessagePattern({ role: 'flight', cmd: 'getSources' })
  getFlightSources(): Promise<string[]> {
    return this.flightService.findAllSources();
  }

  @MessagePattern({ role: 'flight', cmd: 'getDestinations' })
  getFlightDestinations(): Promise<string[]> {
    return this.flightService.findAllDestinations();
  }
}
