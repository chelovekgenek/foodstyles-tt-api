import { Field, InputType, PickType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserSchema } from './user.schema';

@InputType()
export class CreateUserInput extends PickType(UserSchema, ['name', 'email']) {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Field()
  @IsEmail()
  email: string;

  @Expose()
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  password: string;
}
