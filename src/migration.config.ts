import { DataSource } from 'typeorm';
import { ConfigService } from './config';

const configService = new ConfigService();

const datasource = new DataSource(configService.database);
datasource.initialize();

export default datasource;
