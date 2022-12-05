import { Module } from '@nestjs/common';
import {
  GraphqlModuleProvider,
  TypeormModuleProvider,
} from '../common/providers';
import { UserModule } from './user';
import { TodoModule } from './todo';
import { ConfigModule } from './config';

@Module({
  imports: [
    GraphqlModuleProvider,
    TypeormModuleProvider,
    ConfigModule,
    UserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
