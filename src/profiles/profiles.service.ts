import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../typeorm/entities/Profile.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../typeorm/entities/User.entity';
@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUserProfile(user: User, profileArgs): Promise<any> {
    const profile: any = this.profileRepo.create({
      ...profileArgs,
    });

    await this.profileRepo.save(profile);

    user.profile = profile;

    await this.userRepo.save(user);
  }
}
