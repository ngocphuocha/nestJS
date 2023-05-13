import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email'],
    });
  }

  public async createUser(userInput: CreateUserInput): Promise<User> {
    const user: User = this.userRepository.create(userInput);

    return await this.userRepository.save(user);
  }
}
