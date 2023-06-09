import { ApiProperty } from '@nestjs/swagger';

export class ListUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
