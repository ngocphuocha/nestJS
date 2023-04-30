import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { UsersService } from './services/users/users.service';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { UserPost } from 'src/typeorm/entities/UserPost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, UserPost])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
