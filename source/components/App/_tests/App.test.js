import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import App from '../App'

describe( '<App />', () => {

  context( 'handles data from HTTP request on componentDidMount', () => {
    let wrapper, mountSpy
    const fakeData = { userId: 9000 }

    before( () => {
      moxios.install()
      mountSpy = sinon.spy(App.prototype, 'componentDidMount')
      wrapper = mount( <App /> )
    } )

    after( () => {
      moxios.uninstall()
      mountSpy.restore()
    } )

    it( 'calls componentDidMount ', () => {
      expect( App.prototype.componentDidMount.calledOnce ).to.equal(true)
    } )

    it( 'sets intial state using data from HTTP response', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect( wrapper.state().userId ).to.eql(9000)
          done()
        }).catch(done)
      })
    )
  })

  context( 'handles error returned from HTTP request on componentDidMount', () => {
    let errorStub

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'error' ).callsFake( () => null)
      mount( <App /> )
    })

    after( () => {
      errorStub.restore()
      moxios.uninstall()
    })

    it('it catches and responds with an error', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: 'fakeError'
        }).then( () => {
          expect( errorStub.calledThrice ).to.equal( true )
          done()
        }).catch( done )
      })
    )
  })
})
