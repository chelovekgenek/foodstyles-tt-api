import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphqlModuleProvider } from './common/providers';
import { UserModule } from './user';
import { ConfigModule } from './config';
import ormconfig from './datasource.config';

@Module({
  imports: [
    GraphqlModuleProvider,
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    UserModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
