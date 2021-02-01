import { Injectable } from '@nestjs/common';
@Injectable()
export class UnidadeFederativaService {
  findAll() {
    return `This action returns all unidadeFederativa`;
  }

  findOne(id: string) {
    return `This action returns a #${id} unidadeFederativa`;
  }
}
