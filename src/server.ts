import { env } from './env'
import { app } from '../src/app'

// Funçao para atribuir uma porta pra aplicaçao web
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    // Listen é uma promise, entao quando ela for executada, .then para ter resposata
    console.log('Server running')
  })
