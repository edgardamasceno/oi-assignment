import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PessoaModule } from './pessoa/pessoa.module';
import { UnidadeFederativaModule } from './unidade-federativa/unidade-federativa.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    RateLimiterModule,
    PessoaModule,
    UnidadeFederativaModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule {}
