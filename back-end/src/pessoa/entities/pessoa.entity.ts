import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

import { Tipo } from '../enums/tipo.enum';

export const PessoaSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    tipo: { type: Tipo },
    telefone: { type: String },
    unidadeFederativa: {
      type: String,
      name: 'unidade_federativa',
    },
    municipio: { type: String },
    nome: { type: String },
    cpf: { type: String, unique: true },
    dataNascimento: { type: Date, name: 'data_nascimento' },
    razaoSocial: { type: String, name: 'razao_social' },
    cnpj: { type: String, unique: true },
  },
  { collection: 'pessoas' },
);

export interface Pessoa extends Document {
  readonly id: string;
  readonly tipo: Tipo;
  readonly telefone: string;
  readonly municipio: string;
  readonly nome: string;
  readonly cpf: string;
  readonly dataNascimento: Date;
  readonly razaoSocial: string;
  readonly cnpj: string;
}