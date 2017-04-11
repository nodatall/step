import fs from 'fs'
import path from 'path'
import { expect, chai } from '../../../../../configuration/testSetup'
import server from '../../../server'

describe( 'app routes', () => {

  context( '/', () => {

    it( 'should return app html', () => {

      chai.request( server )
        .get( '/' )
        .then( response => {
          const pathToHTML = path.join( __dirname, '/../../../../../public/index.html' )
          const responseHTML = response.text
          const expectedHTML = fs.readFileSync( pathToHTML, 'utf8' )
          expect( responseHTML ).to.equal( expectedHTML )
        })
        .catch( error => console.error( 'error in appRoutes.test.js: ', error )) //eslint-disable-line
    })

  })

})
