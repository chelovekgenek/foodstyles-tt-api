import { DataSource } from 'typeorm';
import ormconfig from './datasource.config';

const datasource = new DataSource(ormconfig);
datasource.initialize();

export default datasource;
