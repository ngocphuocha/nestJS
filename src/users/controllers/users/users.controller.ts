import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.userService.findUsers();
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Successfully', statusCode: HttpStatus.OK, users });
    } catch (error) {}
  }

  @Post()
  async creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { confirmPassword, ...userDetails } = createUserDto;

      if (confirmPassword !== userDetails.password) {
        return 'Confirm password is not correct';
      }

      await this.userService.createUser(userDetails);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully', statusCode: HttpStatus.CREATED });
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Successfully', statusCode: HttpStatus.OK });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Successfully', statusCode: HttpStatus.OK });
  }

  @Post(':userId/profile')
  async createProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProfileDto: CreateUserProfileDto,
    @Res() res: Response,
  ) {
    await this.userService.createUserProfile(userId, createProfileDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Successfully', statusCode: HttpStatus.OK });
  }

  @Post(':userId/post')
  async createUserPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserPostDto: CreateUserPostDto,
    @Res() res: Response,
  ) {
    const post = await this.userService.createUserPost(
      userId,
      createUserPostDto,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Successfully', statusCode: HttpStatus.OK, post });
  }
}
