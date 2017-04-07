import { jsdom } from 'jsdom'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import knex from '../source/dataServices/database/knex'

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
