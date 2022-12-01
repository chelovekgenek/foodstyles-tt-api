import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoSchema {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field()
  completed: boolean;
}
