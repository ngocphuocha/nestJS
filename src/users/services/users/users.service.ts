import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { UserPost } from 'src/typeorm/entities/UserPost.entity';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(UserPost) private postRepostiry: Repository<UserPost>,
  ) {}

  async findUsers() {
    return await this.userRepository.find();
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({ ...userDetails });
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return await this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }

  async createUserProfile(
    userId: number,
    createUserProfile: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(createUserProfile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(
    userId: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPost = this.postRepostiry.create({
      ...createUserPostDetails,
      user,
    });

    return this.postRepostiry.save(newPost);
  }
}
