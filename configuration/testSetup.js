import { jsdom } from 'jsdom'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import globalState from '../source/components/utilities/globalState'

process.env.NODE_ENV = 'test'
const knex = require( '../source/dataServices/database/knex' )

chai.use( chaiHttp )

const testSetup = () => {
  knex.truncateAllTables()
  global.document = jsdom( '' )
  global.window = document.defaultView
  global.navigator = {
    userAgent: 'node.js'
  }
  global.__HOST__ = 'http://localhost:1337'
}

beforeEach( () => {
  testSetup()
})

afterEach( () => {
  globalState.reset()
})

export { knex, chai, expect, testSetup }
