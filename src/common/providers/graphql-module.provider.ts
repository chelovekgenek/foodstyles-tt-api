import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '../../modules/config';

export const GraphqlModuleProvider =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      autoSchemaFile: true,
      cache: 'bounded',
      introspection: true,
      playground: configService.graphql.playground,
    }),
  });
