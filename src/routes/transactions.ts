import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // GET - POST - PUT - PATCH - DELETE -> Podemos chamr a funçao de cada para oo app
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    // Valida os dados da requisiçao, usando o parse para passar para request body o createTransactionBodySchema
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // Recebo a sessionId por meio do cookie
    let sessionId = request.cookies.sessionId

    // Se nao tiver uma sessionId, adiciono uma nova com randomUUID
    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        // Todas as rotas podem acessar esse cookie
        path: '/',
        // Quanto em segundos esse cookie vai durar
        maxAge: 60 * 60 * 24 * 7, // 7 Dias
      })
    }
    // Inseri na tabela transactions, e verifica o tipo do amount
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      // Insiro a sessionId existente ou criaada
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.get(
    '/',
    // Quando o usuario acessar a rota raiz, antes de executar a funcao handler, ele passa por uma checkagem antes com o prehandler(middleware)
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      // Seleciono tudo da tabela transactions que possui sessionid
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()
      // Envio como objeto caso no futuro queira adicionar mais sessoes
      return reply.status(200).send({
        transactions,
      })
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      // Valido o uuid para conseguir ele como parametro
      const getTransactionByIdSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionByIdSchema.parse(request.params)
      // Seleciono o id especifico
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return reply.status(201).send(transaction)
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where({ session_id: sessionId })
        // Soma tudo que esta em amount, "as" para dar nome a essa soma
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Valido o id para coseguir passar como parametro
      const deleteTransactionByIdSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteTransactionByIdSchema.parse(request.params)
      // Deletar o id especifico
      await knex('transactions').where('id', id).del()

      return reply.status(204).send()
    },
  )
}
