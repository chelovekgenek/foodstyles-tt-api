import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(NestApplication.name);
  const configService = app.get(ConfigService);

  await app.listen(configService.port, () => {
    logger.log(`Running on: http://localhost:${configService.port}`);
    if (configService.graphql.playground) {
      logger.log(
        `Read docs on: http://localhost:${configService.port}/graphql`,
      );
    }
  });
}
bootstrap();
