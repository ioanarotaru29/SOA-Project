import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'SOAProject',
      synchronize: false,
      entities: [User],
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
