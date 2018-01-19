import { jsdom } from 'jsdom'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { handleUnhandledRejection } from 'sym/source/errorHandling/serverErrorHandlers'
import globalState from '../source/components/utilities/globalState'

handleUnhandledRejection()

global.__ENV__ = 'test'
process.env.PORT = 7357

const knex = require( '../source/dataServices/database/knex' )

chai.use( chaiHttp )

const testSetup = () => {
  global.document = jsdom( '' )
  global.window = document.defaultView
  global.navigator = {
    userAgent: 'node.js'
  }
  return knex.truncateAllTables()
}

beforeEach( () => testSetup() )

afterEach( () => globalState.reset() )

export { knex, chai, expect, testSetup }
