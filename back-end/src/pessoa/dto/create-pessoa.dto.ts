import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Tipo } from '../enums/tipo.enum';

export class CreatePessoaDto {
  @ApiProperty({ enum: Tipo })
  @IsString({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TIPO deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TIPO deve possuir conteúdo',
  })
  @IsEnum(Tipo, {
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TIPO deve conter apenas PESSOA FÍSICA ou PESSOA JURÍDICA',
  })
  readonly tipo!: Tipo;

  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TELEFONE deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TELEFONE deve possuir conteúdo',
  })
  @Length(10, 10, {
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'TELEFONE deve conter exatamente 10 caractéres',
  })
  readonly telefone!: string;

  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'UF (Unidade Federativa) deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'UF (Unidade Federativa) deve possuir conteúdo',
  })
  @Length(2, 2, {
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'UF (UIDADE FEDERATIVA) deve conter exatamente 2 caractéres',
  })
  readonly unidadeFederativa!: string;

  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'MUNICÍPIO deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'MUNICÍPIO deve possuir conteúdo',
  })
  @MinLength(1, {
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'MUNICÍPIO deve possuir no mínimo 1 caractéres',
  })
  @MaxLength(50, {
    groups: ['PESSOA FÍSICA', 'PESSOA JURÍDICA'],
    message: 'MUNICÍPIO deve possuir no máximo 100 caractéres',
  })
  readonly municipio!: string;
}

export class CreatePessoaFisicaDto extends CreatePessoaDto {
  @ApiProperty()
  @IsString({
    groups: ['PESSOA FÍSICA'],
    message: 'NOME deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA'],
    message: 'NOME deve possuir conteúdo',
  })
  @MinLength(5, {
    message: 'NOME deve possuir no mínimo 5 caractéres',
  })
  @MaxLength(100, {
    message: 'NOME deve possuir no máximo 100 caractéres',
  })
  readonly nome!: string;

  @ApiProperty()
  @IsNotEmpty({
    groups: ['PESSOA FÍSICA'],
    message: 'CPF deve conter uma string',
  })
  @Length(11, 11, {
    groups: ['PESSOA FÍSICA'],
    message: 'CPF deve possuir exatamente 11 caractéres',
  })
  readonly cpf!: string;

  @ApiProperty()
  @IsDate({
    groups: ['PESSOA FÍSICA'],
    message: 'DATA DE NASCIMENTO deve conter uma data válida',
  })
  @Type(() => Date)
  readonly dataNascimento!: Date;
}

export class CreatePessoaJuridicaDto extends CreatePessoaDto {
  @ApiProperty()
  @IsString({
    groups: ['PESSOA JURÍDICA'],
    message: 'RAZÃO SOCIAL deve conter uma string',
  })
  @IsNotEmpty({
    groups: ['PESSOA JURÍDICA'],
    message: 'RAZÃO SOCIAL deve possuir conteúdo',
  })
  @MinLength(5, {
    groups: ['PESSOA JURÍDICA'],
    message: 'RAZÃO SOCIAL deve possuir no mínimo 5 caractéres',
  })
  @MaxLength(100, {
    groups: ['PESSOA JURÍDICA'],
    message: 'RAZÃO SOCIAL deve possuir no máximo 100 caractéres',
  })
  readonly razaoSocial!: string;

  @ApiProperty()
  @IsNotEmpty({
    groups: ['PESSOA JURÍDICA'],
    message: 'CNPJ deve conter uma string',
  })
  @Length(15, 15, {
    groups: ['PESSOA JURÍDICA'],
    message: 'CNPJ deve possuir exatamente 15 caractéres',
  })
  readonly cnpj!: string;
}
