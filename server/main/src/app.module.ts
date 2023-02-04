import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'FLIGHT_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4020,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'BOOKING_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4030,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
