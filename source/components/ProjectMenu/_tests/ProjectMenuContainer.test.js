import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockGlobalState, mockProjects } from 'sym/source/testUtilities'
import ProjectMenuContainer from '../ProjectMenuContainer'
import globalState from '../../utilities/globalState'

describe( '<ProjectMenuContainer />', () => {
  let wrapper

  context( 'without projects in the globalState', () => {
    let mountSpy, errorStub

    beforeEach( () => {
      moxios.install()
      mountSpy = sinon.spy( ProjectMenuContainer.prototype, 'componentDidMount' )
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      wrapper = mount( <ProjectMenuContainer /> )
    })

    afterEach( () => {
      moxios.uninstall()
      mountSpy.restore()
      errorStub.restore()
      wrapper.unmount()
    })

    it( 'calls componentDidMount', () => {
      expect( ProjectMenuContainer.prototype.componentDidMount.calledOnce ).to.equal( true )
    })

    it( 'sets state using data from HTTP response', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockProjects
        }).then( () => {
          expect( wrapper.state().projects[1].text ).to.eql( mockProjects[0].text )
          done()
        }).catch( done )
      })
    )

    it( 'componentDidMount catches and responds with an error', done =>
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

  context( 'with projects in the globalState', () => {
    let mountStub

    before( () => {
      globalState.set( mockGlobalState )
      mountStub = sinon.stub( ProjectMenuContainer.prototype, 'componentDidMount' ).callsFake( () => null )
      wrapper = mount( <ProjectMenuContainer /> )
    })

    after( () => {
      wrapper.unmount()
      mountStub.restore()
    })

    it( 'should render <RowList />', () =>
      expect( wrapper.find( 'RowList' ).length ).to.equal( 1 )
    )

  })

})
