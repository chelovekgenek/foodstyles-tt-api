import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserSchema {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;
}
