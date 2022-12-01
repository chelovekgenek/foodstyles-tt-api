import { Logger } from '@nestjs/common';
import { cwd } from 'process';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { LoggerOptions } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigSchema } from './config.schema';
import { ConfigDatabase, ConfigGraphql, ConfigJwt } from './config.types';
import { flattenValidationErrors } from '../common/utils';

export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly schema: ConfigSchema = new ConfigSchema();

  constructor() {
    const nextSchema = this.collectAndTransform();

    const errors = validateSync(nextSchema);
    if (errors.length) {
      this.logger.error('Config validation error!');
      for (const error of flattenValidationErrors(errors)) {
        this.logger.error(`${error.path}: ${error.message};`);
      }
      process.exit(1);
    }

    this.schema = nextSchema;
  }

  get port(): number {
    return this.schema.PORT;
  }

  get graphql(): ConfigGraphql {
    return {
      playground: this.schema.GRAPHQL_PLAYGROUND,
    };
  }

  get jwt(): ConfigJwt {
    return {
      secret: this.schema.JWT_SECRET,
    };
  }

  get database(): ConfigDatabase {
    return {
      name: 'default',
      type: 'postgres',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      url: this.schema.DATABASE_URL,
      logging: this.schema.DATABASE_LOGGING as LoggerOptions,
      synchronize: this.schema.DATABASE_SYNCHRONIZE,
    };
  }

  private collectAndTransform(): ConfigSchema {
    const dotenvPath = path.join(cwd(), '.env');
    let rawSchema: Partial<ConfigSchema> = this.schema;
    if (fs.existsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      rawSchema = {
        ...rawSchema,
        ...dotenv.parse(fs.readFileSync(dotenvPath, 'utf8')),
      };
    }

    rawSchema = Object.entries(process.env).reduce((acc, [key, value]) => {
      if (key in acc) {
        acc[key] = value;
      }
      return acc;
    }, rawSchema);

    return plainToClass(ConfigSchema, rawSchema);
  }
}
