import { IsNotEmpty } from 'class-validator';
import { IsNumber } from '@custom-decorator';

export class CreateUserProfileDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  dob: string;
}
