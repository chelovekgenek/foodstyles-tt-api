import { InputType, PickType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class LoginUserInput extends PickType(CreateUserInput, [
  'email',
  'password',
]) {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}
