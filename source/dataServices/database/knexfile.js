const path = require('path')

const defaultConfiguration = env => {
  const connectionString = (
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@localhost:5432/step_${env}`
  )

  return {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join( __dirname, '/migrations' ),
      tableName: 'migrations'
    }
  }
}

module.exports = {
  test: defaultConfiguration('test'),
  development: defaultConfiguration('development'),
  production: defaultConfiguration('production'),
}
