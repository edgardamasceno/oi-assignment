import { Module } from '@nestjs/common';
import { UnidadeFederativaService } from './unidade-federativa.service';
import { UnidadeFederativaController } from './unidade-federativa.controller';

@Module({
  controllers: [UnidadeFederativaController],
  providers: [UnidadeFederativaService]
})
export class UnidadeFederativaModule {}
