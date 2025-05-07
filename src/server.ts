import fastify from 'fastify'
import { knex } from './database'

// Cria a base da aplicaçao web, app passa a ser usada para usar as funcionalidades
const app = fastify()

// GET - POST - PUT - PATCH - DELETE -> Podemos chamr a funçao de cada para oo app
app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

// Funçao para atribuir uma porta pra aplicaçao web
app
  .listen({
    port: 3000,
  })
  .then(() => {
    // Listen é uma promise, entao quando ela for executada, .then para ter resposata
    console.log('Server running')
  })
