import { Controller, Get, Param } from '@nestjs/common';
import { UnidadeFederativaService } from './unidade-federativa.service';

@Controller('unidade-federativa')
export class UnidadeFederativaController {
  constructor(
    private readonly unidadeFederativaService: UnidadeFederativaService,
  ) {}

  @Get()
  findAll() {
    return this.unidadeFederativaService.findAll();
  }

  @Get(':uf/municipios')
  findOne(@Param('uf') uf: string) {
    return this.unidadeFederativaService.findOne(uf);
  }
}
