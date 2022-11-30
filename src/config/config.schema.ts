import { IsBoolean, IsInt, Max, Min } from 'class-validator';
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
}
