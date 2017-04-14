import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import ProjectContainer from '../ProjectContainer'
import globalState from '../../utilities/globalState'

describe( ' <ProjectContainer />', () => {

  it( 'renders the child component', () =>
    expect( shallow( <ProjectContainer /> ).find( 'Project' ).length ).to.equal( 1 )
  )

  context( 'handles data from HTTP request on componentDidMount', () => {
    let wrapper, mountSpy
    const fakeData = [
      { id: 1, text: 'amazing could do' },
      { id: 2, text: 'another amazing could do' }
    ]

    before( () => {
      moxios.install()
      mountSpy = sinon.spy( ProjectContainer.prototype, 'componentDidMount' )
      globalState.set({ currentProjectId: 1 })
      wrapper = mount( <ProjectContainer /> )
    })

    after( () => {
      moxios.uninstall()
      mountSpy.restore()
      globalState.set({ currentProjectId: null })
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
          expect( wrapper.state().couldDos[1] ).to.equal( fakeData ) // eslint-disable-line
          done()
        }).catch( done )
      })
    })

  })

  xcontext( 'handles error returned from HTTP request on componentDidMount', () => {
    let errorStub

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'error' ).callsFake( () => null )
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
