import { Field, InputType, PickType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { TodoSchema } from './todo.schema';

@InputType()
export class CreateTodoInput extends PickType(TodoSchema, ['text']) {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;
}
