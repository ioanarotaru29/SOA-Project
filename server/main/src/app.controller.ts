import {
  Controller,
  Get,
  Logger,
  UseGuards,
  Post,
  Sse,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { interval, map, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('flights')
  getFlights(@Req() req): Promise<any> {
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
  createBooking(@Req() req): Promise<any> {
    return this.appService.createBooking(req.body);
  }

  @Post('/bookings/webhook')
  webhook(@Req() req: RawBodyRequest<Request>): Promise<void> {
    return this.appService.updateBooking(
      req.rawBody,
      req.headers['stripe-signature'],
    );
  }

  @Sse('/sse')
  sse(): Observable<any> {
    return null;
    // return this.appService.subscribe();
  }
}
