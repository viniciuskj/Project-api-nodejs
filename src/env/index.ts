import 'dotenv/config'
import { z } from 'zod'

// Formato que vou receber de dados da nossa variavel de ambiente
const envSchema = z.object({
  // enum -> 'um em alguns'
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3000),
})

// safeParce pega os dados do env.Schema e passar pr eles os dados que estao vindo de process.env, e o zod faz a validaçao
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid envioronment variables!')
}

export const env = _env.data
