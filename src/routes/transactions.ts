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

  app.get('/', async (request, reply) => {
    // Seleciono tudo da tabela transactions
    const transactions = await knex.select('*').from('transactions')
    // Envio como objeto caso no futuro queira adicionar mais sessoes
    return reply.status(200).send({
      transactions,
    })
  })

  app.get('/:id', async (request, reply) => {
    // Valido o uuid para conseguir ele como parametro
    const getTransactionByIdSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionByIdSchema.parse(request.params)
    // Seleciono o id especifico
    const transaction = await knex('transactions').where('id', id).first()

    return reply.status(201).send(transaction)
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      // Soma tudo que esta em amount, "as" para dar nome a essa soma
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.delete('/:id', async (request, reply) => {
    // Valido o id para coseguir passar como parametro
    const deleteTransactionByIdSchema = z.object({
      id: z.string(),
    })

    const { id } = deleteTransactionByIdSchema.parse(request.params)
    // Deletar o id especifico
    await knex('transactions').where('id', id).del()

    return reply.status(204).send()
  })
}
