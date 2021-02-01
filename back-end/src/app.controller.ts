import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller()
@ApiTags('Status')
export class AppController {
  @Get('/health')
  @ApiOperation({ summary: 'Verifica o status da API' })
  @RateLimit({
    for: 'Fastify',
    keyPrefix: 'health-check',
    points: 1,
    duration: 5,
    blockDuration: 5,
    errorMessage:
      'Limite de requisições excedido. Requisições bloaqueadas por 5 segundos.',
  })
  getHealthCheck() {
    return {
      status: 'ok',
    };
  }
}
