import {
  Controller,
  Get,
  Logger,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('flights')
  getFlights(@Request() req): Promise<any> {
    return this.appService.getFlights(req.query);
  }

  @Get('flights/sources')
  getFlightSources(): Promise<any> {
    return this.appService.getSources();
  }

  @Get('flights/destinations')
  getFlightDestinations(): Promise<any> {
    return this.appService.getDestinations();
  }

  @UseGuards(AuthGuard)
  @Post('bookings')
  createBooking(@Request() req): Promise<any> {
    return this.appService.createBooking(req.body);
  }

  @Post('/payment/webhook')
  webhook(@Request() req): string {
    Logger.log(req.body);
    return 'Success';
  }
}
