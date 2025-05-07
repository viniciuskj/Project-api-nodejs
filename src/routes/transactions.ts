import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  // GET - POST - PUT - PATCH - DELETE -> Podemos chamr a funçao de cada para oo app
  app.get('/hello', async () => {
    const tables = await knex('sqlite_schema').select('*')

    return tables
  })
}
