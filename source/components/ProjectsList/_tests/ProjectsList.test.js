import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import ProjectListContainer from '../ProjectListContainer'

describe( '<ProjectListContainer />', () => {

  it( 'renders the child component', () =>
      expect(shallow( <ProjectListContainer /> ).find( 'RowList' ).length).to.equal( 1 )
  )

  context( 'handles data from HTTP request on componentDidMount', () => {
    let wrapper, mountSpy
    const fakeData = [{ id: 1, text: 'cows' }]

    before( () => {
      moxios.install()
      mountSpy = sinon.spy( ProjectListContainer.prototype, 'componentDidMount' )
      wrapper = mount( <ProjectListContainer /> )
    })

    after( () => {
      moxios.uninstall()
      mountSpy.restore()
    })

    it( 'calls componentDidMount', () => {
      expect( ProjectListContainer.prototype.componentDidMount.calledOnce ).to.equal( true )
    })

    it( 'sets state using data from HTTP response', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect( wrapper.state().projects ).to.eql( fakeData )
          done()
        }).catch(done)
      })
    )
  })

  context( 'handles error returned from HTTP request on componentDidMount', () => {
    let errorStub

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'error' ).callsFake( () => null )
      mount( <ProjectListContainer /> )
    })

    after( () => {
      errorStub.restore()
      moxios.uninstall()
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
