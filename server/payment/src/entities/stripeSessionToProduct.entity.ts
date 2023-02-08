import { StripeSessionToProductInterface } from './stripeSessionToProduct.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StripeSessionToProduct implements StripeSessionToProductInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeSessionId: string;

  @Column()
  externalProductId: number;
}
