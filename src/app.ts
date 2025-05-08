import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

// Cria a base da aplicaçao web, app passa a ser usada para usar as funcionalidades
export const app = fastify()

// Registrar os cookies
app.register(cookie)
// Registra as rotas, mas é sempre em sequencia
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
