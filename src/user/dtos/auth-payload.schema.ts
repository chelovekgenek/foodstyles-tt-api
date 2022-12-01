import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType('AuthPayload')
export class AuthPayloadSchema {
  @Field()
  @Expose()
  accessToken: string;
}
