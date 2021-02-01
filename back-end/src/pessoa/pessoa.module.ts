import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PessoaSchema } from './entities/pessoa.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PessoaRepository } from './repository/pessoa.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'pessoas',
        schema: PessoaSchema,
        collection: 'pessoas',
      },
    ]),
  ],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService, PessoaRepository],
})
export class PessoaModule {}
