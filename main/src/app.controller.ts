import { Controller, Get, Logger, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Request() req): string {
    Logger.log(req.headers);
    return this.appService.getHello();
  }

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
}
