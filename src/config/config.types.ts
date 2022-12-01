import { LoggerOptions } from 'typeorm';

export interface ConfigGraphql {
  playground: boolean;
}

export interface ConfigDatabase {
  url: string;
  logging: LoggerOptions;
  migrating: boolean;
  synchronize: boolean;
}
