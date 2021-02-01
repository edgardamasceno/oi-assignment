import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  CreatePessoaFisicaDto,
  CreatePessoaJuridicaDto,
} from 'src/pessoa/dto/create-pessoa.dto';

@Injectable()
export class PessoaValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(entity: any, metadata: ArgumentMetadata) {
    const groups = [];
    let entityClass;
    try {
      if (entity.tipo === 'PESSOA FÍSICA') {
        groups.push('PESSOA FÍSICA');
        entity = <CreatePessoaFisicaDto>entity;
        entityClass = plainToClass(CreatePessoaFisicaDto, entity, { groups });
      } else {
        groups.push('PESSOA JURÍDICA');
        entity = <CreatePessoaJuridicaDto>entity;
        entityClass = plainToClass(CreatePessoaJuridicaDto, entity, { groups });
      }

      const errors = await validate(entityClass, { groups });
      if (errors.length > 0) {
        throw new HttpException(
          `'Falha ao validar requisição: ${this.createErrors(errors).join(
            ', ',
          )}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return entityClass;
    } catch (error) {
      throw error;
    }
  }

  private createErrors(errors: any[]) {
    return errors.map((error) => {
      for (const key in error.constraints) {
        return error.constraints[key];
      }
    });
  }
}
