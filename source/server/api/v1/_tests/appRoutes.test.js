import { expect, chai } from '../../../../../configuration/testSetup'
import server from '../../../server'

describe( 'app routes', () => {

  context( '/', () => {

    it( 'should return app html', () => {

      chai.request( server )
        .get( '/' )
        .then( response => {
          const responseHTML = response.text
          const expectedHTML = '<!DOCTYPE html>\n<html>\n  <head>\n    <link rel="stylesheet" type="text/css" href="main.css" />\n  </head>\n  <body>\n    <div id="anchor"></div>\n    <script src="index.js"></script>\n  </body>\n</html>\n'
          expect(responseHTML).to.equal(expectedHTML)
        })

    })

  })

})
