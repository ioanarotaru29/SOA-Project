import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
