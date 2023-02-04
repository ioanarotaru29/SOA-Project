import { Controller, Post, UseGuards, Request, Logger} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign_in')
  async sign_in(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('sign_up')
  async sign_up(@Request() req) {
    return this.authService.register(req.body);
  }
}
