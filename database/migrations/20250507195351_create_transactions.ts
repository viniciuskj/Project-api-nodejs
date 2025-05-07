import type { Knex } from 'knex'

// Formar - Criar
export async function up(knex: Knex): Promise<void> {
  // Criaçao da tabela - seguindo table.oqueCriar.nomeDaColuna.especificaçao
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
  })
}

// Excluir - Retirar
export async function down(knex: Knex): Promise<void> {
  // Exclui a tabela
  await knex.schema.dropTable('transactions')
}
