import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  CreatePessoaDto,
  CreatePessoaFisicaDto,
  CreatePessoaJuridicaDto,
} from './create-pessoa.dto';

export class UpdatePessoaDto extends CreatePessoaDto {
  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'ID deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'ID deve possuir conteúdo',
  })
  readonly _id!: string;
}

export class UpdatePessoaFisicaDto extends CreatePessoaFisicaDto {
  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA'],
    message: 'ID deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA'],
    message: 'ID deve possuir conteúdo',
  })
  readonly _id!: string;
}

export class UpdatePessoaJuridicaDto extends CreatePessoaJuridicaDto {
  @ApiProperty()
  @IsString({
    groups: ['PESSOA JURÍDICA'],
    message: 'ID deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA JURÍDICA'],
    message: 'ID deve possuir conteúdo',
  })
  readonly _id!: string;
}
