import { Module } from '@nestjs/common';
import { GraphqlModuleProvider } from './common/providers';
import { UserModule } from './user';
import { ConfigModule } from './config';

@Module({
  imports: [GraphqlModuleProvider, UserModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
