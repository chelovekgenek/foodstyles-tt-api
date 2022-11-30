import { cwd } from 'process';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { plainToClass } from 'class-transformer';
import { ConfigSchema } from './config.schema';
import { ConfigGraphql } from './config.types';

export class ConfigService {
  private readonly schema: ConfigSchema = new ConfigSchema();

  constructor() {
    const nextSchema = this.collectAndTransform();
    this.schema = nextSchema;
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

  get port(): number {
    return this.schema.PORT;
  }

  get graphql(): ConfigGraphql {
    return {
      playground: this.schema.GRAPHQL_PLAYGROUND,
    };
  }
}
