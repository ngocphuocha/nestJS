import {
  Body,
  ConflictException,
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
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { ListUserDto } from 'src/users/dtos/Res/ListUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [ListUserDto] })
  async getUsers(@Res() res: Response) {
    try {
      const users: User[] = await this.userService.findUsers();
      const userDto: ListUserDto = new ListUserDto();

      const listUsers: ListUserDto[] = users.map((user: User) => {
        userDto.id = user.id;
        userDto.email = user.email;
        userDto.username = user.username;
        return userDto;
      });
      return res.status(HttpStatus.OK).json({
        message: 'Successfully',
        statusCode: HttpStatus.OK,
        users: listUsers,
      });
    } catch (error) {}
  }

  @Post()
  async creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { confirmPassword, ...userDetails } = createUserDto;

      const existingUserByEmail = await this.userService.findByEmail(
        userDetails.email,
      );

      if (existingUserByEmail) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Email is already in use',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const existingUserByUsername = await this.userService.findByUsername(
        userDetails.username,
      );

      if (existingUserByUsername) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'UserName is already in use',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (confirmPassword !== userDetails.password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Password confirm is not correct',
          statusCode: HttpStatus.BAD_REQUEST,
        });
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
