import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config';
import { UserEntity } from './user.entity';
import { AuthResolver, UserResolver } from './resolvers';
import { AuthService, UserService } from './services';
import { JwtModuleProvider } from '../../common/providers';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModuleProvider,
    ConfigModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    UserResolver,
    AuthResolver,
    UserService,
    AuthService,
  ],
})
export class UserModule {}
