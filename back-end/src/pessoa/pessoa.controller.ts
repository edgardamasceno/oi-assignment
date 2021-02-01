import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';
import { PessoaService } from './pessoa.service';
import {
  CreatePessoaDto,
  CreatePessoaFisicaDto,
  CreatePessoaJuridicaDto,
} from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { PessoaValidationPipe } from 'src/pipes/validation/pessoa.validation';

@Controller('pessoa')
@ApiTags('Pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  @ApiOperation({
    tags: ['Manter pessoa'],
    description: 'Adiciona pessoa',
    summary: 'Adiciona nova pessoa física ou jurídica ao banco de dados',
    operationId: 'create',
    requestBody: {
      content: {
        'application/json': {},
      },
      required: true,
    },
  })
  @ApiBody({
    type: CreatePessoaFisicaDto,
    description: 'Pessoa Física',
    required: true,
    isArray: false,
  })
  @RateLimit({
    for: 'Fastify',
    keyPrefix: 'pessoa',
    points: 1,
    duration: 10,
    blockDuration: 10,
    errorMessage:
      'Limite de requisições excedido. Requisições bloaqueadas por 10 segundos.',
  })
  @UsePipes(new PessoaValidationPipe())
  create(
    @Body()
    createPessoaDto: CreatePessoaDto,
  ) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Get()
  @RateLimit({
    for: 'Fastify',
    keyPrefix: 'pessoa',
    points: 3,
    duration: 30,
    errorMessage:
      'Limite de requisições excedido. Requisições bloaqueadas por 30 segundos.',
  })
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    tags: ['Manter pessoa'],
    description: 'Editar pessoa',
    summary: 'Edita pessoa física ou jurídica',
    operationId: 'update',
    requestBody: {
      content: {
        'application/json': {},
      },
      required: true,
    },
  })
  @ApiBody({
    type: CreatePessoaFisicaDto,
    description: 'Pessoa Física',
    required: true,
    isArray: false,
  })
  @RateLimit({
    for: 'Fastify',
    keyPrefix: 'pessoa',
    points: 1,
    duration: 10,
    blockDuration: 10,
    errorMessage:
      'Limite de requisições excedido. Requisições bloaqueadas por 10 segundos.',
  })
  @UsePipes(new PessoaValidationPipe())
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  @RateLimit({
    for: 'Fastify',
    keyPrefix: 'pessoa',
    points: 5,
    duration: 10,
    blockDuration: 10,
    errorMessage:
      'Limite de requisições excedido. Requisições bloaqueadas por 10 segundos.',
  })
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
