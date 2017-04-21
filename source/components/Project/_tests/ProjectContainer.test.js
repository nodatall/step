import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { mockGlobalState, mockCouldDos } from 'sym/source/testUtilities/mockComponentData'
import { expect } from 'sym/configuration/testSetup'
import ProjectContainer from '../ProjectContainer'
import globalState from '../../utilities/globalState'

describe( '<ProjectContainer />', () => {

  it( 'renders the child component', () => {
    globalState.set( mockGlobalState )
    expect( shallow( <ProjectContainer /> ).find( 'Project' ).length ).to.equal( 1 )
  })

  context( 'when there are no couldDos matching current project id', () => {
    let wrapper, mountSpy, errorStub, globalStateWithoutCouldDo = JSON.parse( JSON.stringify( mockGlobalState ) ) //eslint-disable-line
    delete globalStateWithoutCouldDo.projects[2].couldDos

    beforeEach( () => {
      globalState.set( globalStateWithoutCouldDo )
      moxios.install()
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      mountSpy = sinon.spy( ProjectContainer.prototype, 'componentDidMount' )
      wrapper = mount( <ProjectContainer /> )
    })

    afterEach( () => {
      moxios.uninstall()
      mountSpy.restore()
      errorStub.restore()
      wrapper.unmount()
    })

    it( 'calls componentDidMount', () => {
      expect( mountSpy.calledOnce ).to.equal( true )
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

    it( 'sets state using data from HTTP response', done => {
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockCouldDos
        }).then( () => {
          expect( wrapper.state().projects[2].couldDos[mockCouldDos[0].id] ).to.eql( mockCouldDos[0] ) // eslint-disable-line
          done()
        }).catch( done )
      })
    })

  })

  context( 'when there are couldDos matching current project id', () => {
    let wrapper

    beforeEach( () => {
      globalState.set( mockGlobalState )
      moxios.install()
      wrapper = mount( <ProjectContainer /> )
    })

    afterEach( () => {
      wrapper.unmount()
      moxios.uninstall()
    })


    it( 'makes no cow HTTP requests', done => {
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        expect( request ).to.be.undefined // eslint-disable-line
        done()
      })
    })

  })

})
