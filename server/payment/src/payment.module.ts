import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StripeSessionToProduct } from './entities/stripeSessionToProduct.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StripeSessionToProduct])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
