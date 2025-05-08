import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'

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
    // Inseri na tabela transactions, e verifica o tipo do amount
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
