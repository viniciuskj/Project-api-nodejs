import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

// Verificaçaose possui a database_url no .env
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found')
}

// Configuraçao do knex
export const config: Knex.Config = {
  // Qual banco de dados sera usado
  client: 'sqlite',
  // Faz a conexao
  connection: {
    filename: env.DATABASE_URL,
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
