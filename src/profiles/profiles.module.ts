import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../typeorm/entities/Profile.entity';
import { User } from '../typeorm/entities/User.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
