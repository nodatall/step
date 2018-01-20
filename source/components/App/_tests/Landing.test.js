import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import Landing from '../Landing'

describe( '<Landing />', () => {

  context( 'handles data from HTTP request on componentDidMount', () => {
    let wrapper, mountSpy
    const fakeData = { userId: 9000 }

    beforeEach( () => {
      moxios.install()
      mountSpy = sinon.spy( Landing.prototype, 'componentWillMount' )
      wrapper = mount( <Landing /> )
    })

    afterEach( () => {
      moxios.uninstall()
      mountSpy.restore()
      wrapper.unmount()
    })

    it( 'calls componentDidMount ', () => {
      expect( Landing.prototype.componentWillMount.calledOnce ).to.equal( true )
    })

    it( 'sets intial state using data from HTTP response', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect( wrapper.state().userId ).to.eql( 9000 )
          done()
        }).catch( done )
      })
    )

    it( 'renders <ProjectMenuContainer />', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect( wrapper.find( 'ProjectMenuContainer' ).length ).to.equal( 1 )
          done()
        }).catch( done )
      })
    )

  })

  context( 'handles error returned from HTTP request on componentDidMount', () => {
    let errorStub, wrapper

    beforeEach( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      wrapper = mount( <Landing /> )
    })

    afterEach( () => {
      errorStub.restore()
      moxios.uninstall()
      wrapper.unmount()
    })

    it( 'it catches and responds with an error', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: 'fakeError'
        }).then( () => {
          expect( errorStub.calledTwice ).to.equal( true )
          done()
        }).catch( done )
      })
    )

  })

})
