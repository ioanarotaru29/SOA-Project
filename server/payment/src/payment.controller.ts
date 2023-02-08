import { Controller, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ role: 'payment', cmd: 'create' })
  async createSession(data: any): Promise<string> {
    return this.paymentService.charge(data);
  }

  @MessagePattern({ role: 'payment', cmd: 'get_product' })
  async getProduct({ data, signature }: any): Promise<number> {
    return this.paymentService.getProduct(data, signature);
  }
}
