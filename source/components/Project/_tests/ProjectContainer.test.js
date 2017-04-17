import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { expect, testSetup } from '../../../../configuration/testSetup'
import ProjectContainer from '../ProjectContainer'
import globalState from '../../utilities/globalState'
import mockGlobalState from '../../../testUtilities/mockComponentData'

describe( ' <ProjectContainer />', () => {

  it( 'renders the child component', () => {
    globalState.set( mockGlobalState )
    expect( shallow( <ProjectContainer /> ).find( 'Project' ).length ).to.equal( 1 )
  })

  context( 'handles data from HTTP request on componentDidMount', () => {
    let wrapper, mountSpy
    const fakeData = [
      { id: 10, text: 'amazing could do' },
      { id: 11, text: 'another amazing could do' }
    ]

    beforeEach( () => {
      testSetup()
      globalState.set( mockGlobalState )
      moxios.install()
      mountSpy = sinon.spy( ProjectContainer.prototype, 'componentDidMount' )
      wrapper = mount( <ProjectContainer /> )
    })

    afterEach( () => {
      moxios.uninstall()
      mountSpy.restore()
    })

    it( 'calls componentDidMount', () => {
      expect( ProjectContainer.prototype.componentDidMount.calledOnce ).to.equal( true )
    })

    it( 'sets state using data from HTTP response', done => {
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect( wrapper.state().couldDos[2] ).to.eql( fakeData ) // eslint-disable-line
          done()
        }).catch( done )
      })
    })

  })

  context( 'handles error returned from HTTP request on componentDidMount', () => {
    let errorStub

    before( () => {
      testSetup()
      globalState.set( mockGlobalState )
      moxios.install()
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      mount( <ProjectContainer /> )
    })

    after( () => {
      errorStub.restore()
      moxios.uninstall()
    })

    it( 'catches and responds with an error', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        return request.respondWith({
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
