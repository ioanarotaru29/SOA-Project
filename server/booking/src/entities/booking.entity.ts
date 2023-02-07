import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingInterface, Status } from './booking.interface';

@Entity()
export class Booking implements BookingInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  packageId: number;

  @Column({
    type: 'enum',
    enum: ['success', 'pending', 'denied'],
    default: 'pending',
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;
}
