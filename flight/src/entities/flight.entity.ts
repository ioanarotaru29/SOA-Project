import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightInterface } from './flight.interface';
import { FlightPackage } from './flightPackage.entity';

@Entity()
export class Flight implements FlightInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column()
  departure: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => FlightPackage, (flightPackage) => flightPackage.flight)
  packages: FlightPackage[];
}
