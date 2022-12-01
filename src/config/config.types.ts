import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface ConfigGraphql {
  playground: boolean;
}

export type ConfigDatabase = PostgresConnectionOptions;

export interface ConfigJwt {
  secret: string;
}
