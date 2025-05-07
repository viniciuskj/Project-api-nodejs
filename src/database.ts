import { knex as setupKnex, Knex } from 'knex'

// Configuraçao do knex
export const config: Knex.Config = {
  // Qual banco de dados sera usado
  client: 'sqlite',
  // Faz a conexao
  connection: {
    filename: './database/app.db',
  },
  useNullAsDefault: true,
  // Onde criar a migration
  migrations: {
    extension: 'ts',
    directory: '/database',
  },
}

// knex recebe a configuraçao do knex
export const knex = setupKnex(config)
