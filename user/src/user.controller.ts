import { User } from './entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ where: { email: data.username } });
  }
}
