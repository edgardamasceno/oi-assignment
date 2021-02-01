import {
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatePessoaDto,
  CreatePessoaFisicaDto,
  CreatePessoaJuridicaDto,
} from '../dto/create-pessoa.dto';
import { plainToClass } from 'class-transformer';
import { Pessoa, PessoaSchema } from '../entities/pessoa.entity';
import {
  UpdatePessoaDto,
  UpdatePessoaFisicaDto,
} from '../dto/update-pessoa.dto';

export class PessoaRepository {
  constructor(
    @InjectModel('pessoas')
    private readonly pessoaModel: Model<Pessoa>,
  ) {}

  public async create(createPessoaDto: CreatePessoaDto) {
    const tipo =
      createPessoaDto instanceof CreatePessoaFisicaDto
        ? 'PESSOA FÍSICA'
        : 'PESSOA JURÍDICA';

    let pessoa;

    if (createPessoaDto instanceof CreatePessoaFisicaDto) {
      const cpf = plainToClass(CreatePessoaFisicaDto, createPessoaDto).cpf;
      pessoa = await this.getPessoaFisica(cpf);
    } else {
      const cnpj = plainToClass(CreatePessoaJuridicaDto, createPessoaDto).cnpj;
      pessoa = await this.getPessoaJuridica(cnpj);
    }

    if (!pessoa) {
      const newPessoa = new this.pessoaModel(createPessoaDto);

      try {
        const createdPessoa = await newPessoa.save();
        return createdPessoa;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else {
      throw new ConflictException(`${tipo.toString()} existente.`);
    }
  }

  public async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    const tipo =
      updatePessoaDto instanceof UpdatePessoaFisicaDto
        ? 'PESSOA FÍSICA'
        : 'PESSOA JURÍDICA';
    const pessoa = await this.getPessoaById(id);

    if (!pessoa) {
      throw new HttpException(
        `${tipo.toString()} não localizada.`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      let pessoa2;
      if (updatePessoaDto instanceof UpdatePessoaFisicaDto) {
        const cpf = plainToClass(UpdatePessoaFisicaDto, updatePessoaDto).cpf;
        pessoa2 = await this.getPessoaFisica(cpf);
      } else {
        const cnpj = plainToClass(CreatePessoaJuridicaDto, updatePessoaDto)
          .cnpj;
        pessoa2 = await this.getPessoaJuridica(cnpj);
      }
      if (
        pessoa._id !== pessoa2._id &&
        pessoa.cpf &&
        pessoa2.cpf &&
        pessoa.cpf !== pessoa2.cpf
      ) {
        console.log(pessoa, pessoa2);
        throw new HttpException(
          `CPF ou CNPJ da ${tipo.toString()} em uso.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updatePessoa = new this.pessoaModel(PessoaSchema);

    try {
      const updatedPessoa = await updatePessoa.updateOne(updatePessoaDto);
      return updatedPessoa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getPessoaById(id: string) {
    try {
      const pessoa = await this.pessoaModel.findOne({ _id: id }).exec();
      return pessoa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getPessoaFisica(cpf: string) {
    try {
      const pessoa = await this.pessoaModel.findOne({ cpf }).exec();
      return pessoa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getPessoaJuridica(cnpj: string) {
    try {
      const pessoa = await this.pessoaModel.findOne({ cnpj }).exec();
      return pessoa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
