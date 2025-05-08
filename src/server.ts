import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

// Cria a base da aplicaçao web, app passa a ser usada para usar as funcionalidades
const app = fastify()

// Registra as rotas, mas é sempre em sequencia
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

// Funçao para atribuir uma porta pra aplicaçao web
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    // Listen é uma promise, entao quando ela for executada, .then para ter resposata
    console.log('Server running')
  })
