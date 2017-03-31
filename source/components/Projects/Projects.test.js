import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../configuration/testSetup'
import ProjectListContainer from '../ProjectsList/ProjectListContainer'
import globalState from '../globalState'

describe( '<ProjectListContainer />', () => {

  context( 'successful componentDidMount and check updateState', () => {
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
      expect(ProjectListContainer.prototype.componentDidMount.calledOnce).to.equal(true)
    })

    it( 'it makes http request and sets state to response', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: fakeData
        }).then( () => {
          expect(wrapper.state().projects).to.eql(fakeData)
          done()
        }).catch(done)
      })
    )
  })

  context( 'failed componentDidMount and successful componentWillUnmount', () => {
    let wrapper, errorStub, unmountSpy

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'log' ).callsFake( () => '')
      unmountSpy = sinon.spy( globalState, 'unsubscribe' )
      wrapper = mount( <ProjectListContainer /> )
    })

    after( () => {
      moxios.uninstall()
      unmountSpy.restore()
    })

    it( 'it catches and responds with an error', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: 'fakeError'
        }).then( () => {
          expect(errorStub.calledTwice).to.equal(true)
          errorStub.restore()
          done()
        }).catch(done)
      })
    )

    it( 'checks if the component will unmount', () => {
      wrapper.unmount()
      expect(unmountSpy.calledOnce).to.equal(true)
    })
  })

  it( 'renders the child component', () =>
      expect(shallow( <ProjectListContainer /> ).find('ProjectListPresentation').length).to.equal(1)
    )

})
