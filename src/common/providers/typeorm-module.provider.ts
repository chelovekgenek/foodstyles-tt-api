import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../../config';

export const TypeormModuleProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => configService.database,
});
