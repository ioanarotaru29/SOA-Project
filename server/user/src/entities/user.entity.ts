import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail, Min } from 'class-validator';
import { hash } from 'bcrypt';
import { UserInterface } from './user.interface';

@Entity()
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(5)
  password: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
