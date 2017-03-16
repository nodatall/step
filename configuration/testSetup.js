import knex from '../source/dataServices/database/knex'
import chai, { expect } from 'chai'

beforeEach( () => knex.truncateAllTables() )

export { knex, chai, expect }
