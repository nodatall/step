import Knex from 'knex'

require('../../../configuration/environment')
const configuration = require('./knexfile')[process.env.NODE_ENV]

const knex = Knex(configuration)

knex.truncateAllTables = () =>
  Promise.all([
    knex('could_dos').truncate(),
    knex('projects').truncate(),
    knex('users').truncate(),
    knex('user_projects').truncate()
  ])

export default knex
