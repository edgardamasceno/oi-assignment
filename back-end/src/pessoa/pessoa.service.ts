import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './repository/pessoa.repository';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoaRepository: PessoaRepository) {}
  async create(createPessoaDto: CreatePessoaDto) {
    const createdPessoa = await this.pessoaRepository.create(createPessoaDto);
    return createdPessoa;
  }

  async findAll() {
    return `This action returns all pessoa`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    const updatedPessoaDto = await this.pessoaRepository.update(
      id,
      updatePessoaDto,
    );
    return updatedPessoaDto;
  }

  async remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
