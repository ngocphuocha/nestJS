import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  dob: string;
}
