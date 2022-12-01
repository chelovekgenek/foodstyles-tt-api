import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { AuthPayloadSchema, LoginUserInput } from '../dtos';
import { AuthService } from '../services';

@Resolver(() => AuthPayloadSchema)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadSchema)
  async loginUser(
    @Args('input') input: LoginUserInput,
  ): Promise<AuthPayloadSchema> {
    const user = await this.authService.validateCredentials(
      input.email,
      input.password,
    );

    const payload = this.authService.signToken(user);
    return this.toDto(payload);
  }

  private toDto(data: AuthPayloadSchema): AuthPayloadSchema {
    return plainToClass(AuthPayloadSchema, data);
  }
}
