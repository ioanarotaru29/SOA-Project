import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { FlightPackage } from './entities/flightPackage.entity';
import { FlightModule } from './flight.module';

@Module({
  imports: [
    FlightModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'SOAProject',
      synchronize: false,
      entities: [Flight, FlightPackage],
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
