import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../../config';

export const JwtModuleProvider = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.jwt.secret,
    signOptions: { expiresIn: '1d' },
  }),
});
