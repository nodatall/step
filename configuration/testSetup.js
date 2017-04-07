import { jsdom } from 'jsdom'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

process.env.NODE_ENV = 'test'
const knex = require( '../source/dataServices/database/knex' )

chai.use( chaiHttp )

beforeEach( () => {
  knex.truncateAllTables()
  global.document = jsdom('')
  global.window = document.defaultView
  global.navigator = {
    userAgent: 'node.js'
  }
})

export { knex, chai, expect }
