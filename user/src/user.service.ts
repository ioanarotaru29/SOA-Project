import { FindOneOptions, InsertResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(query: FindOneOptions<User>): Promise<User> {
    Logger.log(this.userRepository.findOne(query));
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      /**
       * Perform all needed checks
       */

      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
