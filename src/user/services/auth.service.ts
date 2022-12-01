import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthPayloadSchema } from '../dtos';
import { JwtPayload } from '../jwt.types';
import { UserEntity } from '../user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async validatePayload(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userService.findById(payload.sub);
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findByEmail(email);

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  signToken(user: UserEntity): AuthPayloadSchema {
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(pwd1: string, pwd2: string): Promise<boolean> {
    return bcrypt.compare(pwd1, pwd2);
  }
}
