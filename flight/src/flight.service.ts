import { Injectable } from '@nestjs/common';
import { Flight } from './entities/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  findAll(query: FindOptionsWhere<any>) {
    return this.flightRepository.find({
      where: query,
      relations: { packages: true },
    });
  }

  findAllSources() {
    return this.flightRepository
      .createQueryBuilder('Flight')
      .select('Flight.source', 'source')
      .distinct(true)
      .getRawMany()
      .then((res) => res.map((o) => o.source));
  }

  findAllDestinations() {
    return this.flightRepository
      .createQueryBuilder('Flight')
      .select('Flight.destination', 'destination')
      .distinct(true)
      .getRawMany()
      .then((res) => res.map((o) => o.destination));
  }
}
