import { Module } from '@nestjs/common';
import { PaymentModule } from './payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeSessionToProduct } from './entities/stripeSessionToProduct.entity';

@Module({
  imports: [
    PaymentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'SOAProject',
      synchronize: false,
      entities: [StripeSessionToProduct],
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
