import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserProfileDto } from './dtos/input/create-user-profile.dto';
import { UsersService } from '../users/services/users/users.service';
import { User } from '../typeorm/entities/User.entity';
import { Response } from 'express';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly userServices: UsersService) {}

  @Post()
  async createUserProfile(
    @Body() createUserProfile: CreateUserProfileDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { userId, ...profileArgs }: { userId: number } = createUserProfile;

      const existedUser: User = await this.userServices.findById(userId);

      if (!existedUser) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Bad Request', statusCode: HttpStatus.BAD_REQUEST });
      }

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully', statusCode: HttpStatus.CREATED });
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: e,
        message: 'Internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
