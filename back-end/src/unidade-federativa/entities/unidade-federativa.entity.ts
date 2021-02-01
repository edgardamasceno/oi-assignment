import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UnidadeFederativaSchema = new mongoose.Schema(
  {
    id: String,
    uf: Number,
    sigla_uf: String,
    cidades: Array<{ codigo_ibge: number; nome_municipio: string }>(),
  },
  { collection: 'unidades_federativas' },
);

export interface UnidadeFederativa extends Document {
  readonly id: string;
  readonly uf: string;
  readonly sigla_uf: string;
  readonly cidades: Array<{ codigo_ibge: number; nome_municipio: string }>;
}
