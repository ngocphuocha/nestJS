import { Field, InputType } from '@nestjs/graphql';
import { GenderEnums } from '@shared/enums';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  slackId: string;

  @Field()
  @IsNotEmpty()
  gender: GenderEnums;

  @Field()
  @IsNotEmpty()
  roleId: number;
}
