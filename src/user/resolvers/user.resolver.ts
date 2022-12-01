import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards';
import { CreateUserInput, UserSchema } from '../dtos';
import { UserEntity } from '../user.entity';
import { UserService } from '../services';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserSchema], { name: 'users', nullable: false })
  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<UserSchema[]> {
    const users = await this.userService.find();
    return users.map((user) => this.toDto(user));
  }

  @Mutation(() => UserSchema)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserSchema> {
    const user = await this.userService.create(input);
    return this.toDto(user);
  }

  private toDto(data: UserEntity): UserSchema {
    return plainToClass(UserSchema, data);
  }
}
