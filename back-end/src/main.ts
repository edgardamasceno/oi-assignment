import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const isProduction = () => {
    return process.env.NODE_ENV?.toLowerCase() === 'production';
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  if (!isProduction()) {
    app.enableCors();
  }

  app.setGlobalPrefix('api/v1');

  const config: ConfigService = app.get('ConfigService');
  const document = SwaggerModule.createDocument(
    app,
    await config.getSwaggerConfig(),
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(await config.getPortConfig(), '0.0.0.0');
}

bootstrap().then(() => console.log('Aplicação iniciada'));
