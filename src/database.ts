import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  // Qual banco esta usando
  client: 'sqlite',
  // Fazer a conexao ao banco
  connection: {
    filename: './tmp/app.db',
  },
})
