import { Query, Resolver } from '@nestjs/graphql';
import { UserSchema } from './user.schema';

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema], { name: 'users', nullable: false })
  async getUsers() {
    return [];
  }
}
