// eslint-disable-next-line
import { Knex } from 'knex'

// Definir para o Knex como deve ser a tabela, para não causar conflito na requisição
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      type: 'credit' | 'debit'
      created_at: string
      session_id?: string
    }
  }
}
