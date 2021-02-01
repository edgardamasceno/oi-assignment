import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = this.getEnvironment();
  }

  private getEnvironment(): EnvConfig {
    try {
      const env = dotenv.config({
        path: `.env.${this.getEnvironmentName().toLowerCase()}`,
      });
      return env.parsed || {};
    } catch (error) {
      throw error;
    }
  }

  public getEnvironmentName(): string {
    if (process.env && process.env.NODE_ENV) {
      return process.env.NODE_ENV;
    }
    throw new Error('Não foi possível identificar o ambiente.');
  }

  public get(key: string): string {
    return this.envConfig[key.toUpperCase()];
  }

  public async getPortConfig() {
    return +this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      uri:
        'mongodb+srv://' +
        this.get('MONGO_USER') +
        ':' +
        this.get('MONGO_PASSWORD') +
        '@' +
        this.get('MONGO_HOST') +
        '/' +
        this.get('MONGO_DATABASE') +
        '?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }

  public async getSwaggerConfig() {
    return new DocumentBuilder()
      .setTitle('HUB - Oi Assignment')
      .setDescription('API Manter Pessoas')
      .setVersion('1.0')
      .build();
  }
}
