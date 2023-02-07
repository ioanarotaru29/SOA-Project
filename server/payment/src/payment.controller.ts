import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ role: 'payment', cmd: 'create' })
  async createBooking(data: any): Promise<string> {
    return this.paymentService.charge(data);
  }
}
