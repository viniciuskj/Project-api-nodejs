// Exporta o config
export default {
  client: 'sqlite',
  connection: {
    filename: './database/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
  },
}
