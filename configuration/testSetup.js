import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import knex from '../source/dataServices/database/knex'

chai.use( chaiHttp )

beforeEach( () => knex.truncateAllTables() )

export { knex, chai, expect }
