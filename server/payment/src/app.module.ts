import { Module } from '@nestjs/common';
import {PaymentModule} from "./payment.module";

@Module({
  imports: [PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
