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
import { interval, last, lastValueFrom, map, Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sseService: SseService,
  ) {}

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
  webhook(@Req() req: RawBodyRequest<Request>): void {
    this.appService.updateBooking(req.rawBody, req.headers['stripe-signature']);

    // this.sseService.addEvent(JSON.stringify(res));
    // return null;
  }

  @Post('/test')
  test() {
    const res = {
      id: 86,
      userId: 25,
      packageId: 1,
      status: 'success',
      createdAt: '2023-02-08T14:42:04.831Z',
    };
    this.sseService.addEvent(JSON.stringify(res));
  }

  @Sse('/sse')
  sse(): Observable<any> {
    // return null;
    return this.sseService.sendEvents();
  }
}
