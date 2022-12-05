import { NestApplication, NestFactory } from '@nestjs/core';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPipes = [
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  ];

  app.useGlobalPipes(...globalPipes);

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
