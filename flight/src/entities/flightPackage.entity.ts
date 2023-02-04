import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightPackageInterface } from './flightPackage.interface';
import { Flight } from './flight.entity';

@Entity()
export class FlightPackage implements FlightPackageInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Flight, (flight) => flight.packages)
  flight: Flight;
}
