# REST API com Node.js

Este projeto consiste em uma API REST para gerenciar transações financeiras, construída com Node.js, Fastify e SQLite.

## Tecnologias utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset de JavaScript com tipagem estática
- **Fastify** - Framework web rápido e de baixa sobrecarga
- **Knex** - Query builder SQL para Node.js
- **SQLite** - Banco de dados relacional
- **Zod** - Biblioteca de validação de dados
- **Vitest** - Framework de testes

## Estrutura do projeto

- `database/migrations`: Contém as migrações do banco de dados
- `src`: Código fonte da aplicação
  - `@types`: Definições de tipos para TypeScript
  - `env`: Configuração de variáveis de ambiente
  - `middleware`: Middleware para validação de autenticação
  - `routes`: Definição das rotas da API
  - `app.ts`: Configuração da aplicação Fastify
  - `database.ts`: Configuração do Knex e conexão com o banco de dados
  - `server.ts`: Inicialização do servidor
- `tests`: Testes automatizados

## Funcionalidades

- Criação de transações (crédito/débito)
- Listagem de todas as transações
- Busca de transação por ID
- Resumo do saldo de transações
- Exclusão de transações
- Autenticação via cookies com session ID

## Rotas da API

- `POST /transactions` - Cria uma nova transação
- `GET /transactions` - Lista todas as transações
- `GET /transactions/:id` - Busca uma transação específica
- `GET /transactions/summary` - Mostra o saldo consolidado
- `DELETE /transactions/:id` - Remove uma transação

## Como executar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```
   NODE_ENV=development
   DATABASE_URL="./database/app.db"
   PORT=3000
   ```
4. Execute as migrações para criar a estrutura do banco de dados:
   ```
   npm run knex -- migrate:latest
   ```
5. Inicie o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

## Scripts disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run knex` - Executa comandos do Knex (migrações, etc.)
- `npm run test` - Roda os testes automatizados
- `npm run lint` - Verifica e corrige problemas de estilo de código

## Testes

O projeto inclui testes de integração para as rotas de transações. Para executar os testes:

```
npm run test
```

## Autenticação

A autenticação é feita através de cookies. Quando um usuário cria uma transação, um ID de sessão é gerado e armazenado em cookie. Este ID é usado para identificar as transações do usuário em requisições subsequentes.

## Banco de Dados

O projeto usa SQLite como banco de dados, com a estrutura definida nas migrações:

- `transactions`: Tabela que armazena as transações com os campos id, title, amount, type, created_at e session_id

## Licença

ISC
