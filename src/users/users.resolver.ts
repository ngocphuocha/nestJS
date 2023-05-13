import { User } from '@entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { ListUserDto } from './dto/args/list-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(): Promise<ListUserDto[]> {
    const users: User[] = await this.userService.getUsers();

    return users.map((user) => {
      const userDTO = new ListUserDto();
      userDTO.id = user.id;
      userDTO.email = user.email;
      return userDTO;
    });
  }

  @Mutation(() => User)
  async createUser(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(userInput);
  }
}
