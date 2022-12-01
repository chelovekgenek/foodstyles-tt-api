import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ToBoolean, ToNumber } from './data-transformers.util';

export class ConfigSchema {
  @ToNumber
  @IsInt()
  @Min(1000)
  @Max(9999)
  PORT = 3000;

  @ToBoolean
  @IsBoolean()
  GRAPHQL_PLAYGROUND = false;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL =
    'postgres://postgres:mysecretpassword@localhost:5432/food-styles';

  @ToBoolean
  @IsBoolean()
  DATABASE_MIGRATION_RUNNING = false;

  @IsIn(['all', 'error'])
  DATABASE_LOGGING: 'all' | 'error' = 'error';

  @IsString()
  @IsNotEmpty()
  JWT_SECRET = 'jwt-secret';
}
