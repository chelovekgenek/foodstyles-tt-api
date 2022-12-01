import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from './config';

const configService = new ConfigService();
const dbConfig = configService.database;

const ormconfig: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  url: dbConfig.url,
  logging: dbConfig.logging,
  synchronize: dbConfig.synchronize,
};

export default ormconfig;
