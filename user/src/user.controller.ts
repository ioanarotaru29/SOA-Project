import { User } from './entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ where: { email: data.username } });
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  async createUser(data: any): Promise<User> {
    try {
      const insertResult = await this.userService.createUser(data.user);
      return this.userService.findOne({
        where: { id: insertResult.identifiers.at(0).id },
      });
    } catch (e) {
      Logger.log(e);
    }
    return null;
  }
}
