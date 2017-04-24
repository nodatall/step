import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import globalState from 'sym/source/components/utilities/globalState'
import { shallow, mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockGlobalState, mockProjectData, mockCouldDoData } from 'sym/source/testUtilities'
import FooterContainer from '../FooterContainer'

describe( '<FooterContainer />', () => {
  let wrapper

  afterEach( () => wrapper.unmount() )

  context( 'handles tests for rendering components and accepting inputs', () => {
    let input

    beforeEach( () => {
      wrapper = mount( <FooterContainer type='project' /> )
      input = wrapper.find( 'input' )
    })

    it( 'renders <Footer />', () =>
      expect( shallow( <FooterContainer /> ).find( 'Footer' ).length ).to.equal( 1 )
    )

    it( 'checks that the input element is being read', () => {
      input.simulate( 'change', { target: { value: 'make garden' } })
      expect( input.props().value ).to.equal( 'make garden' )
    })

  })

  context( 'when adding a new project', () => {
    let input, button, onSubmitSpy, generateItemSpy, addProjectSpy

    beforeEach( () => {
      moxios.install()
      addProjectSpy = sinon.spy( globalState, 'addProject' )
      onSubmitSpy = sinon.spy( FooterContainer.prototype, 'onSubmit' )
      generateItemSpy = sinon.spy( FooterContainer.prototype, 'generateNewItem' )
      globalState.set( mockGlobalState )
      wrapper = mount( <FooterContainer type='project' /> )
      input = wrapper.find( 'input' )
      button = wrapper.find( 'button' )
    })

    afterEach( () => {
      moxios.uninstall()
      onSubmitSpy.restore()
      generateItemSpy.restore()
      addProjectSpy.restore()
    })


    it( 'successfully calls "/project/new" when the type is \'project\'', done => {
      input.simulate( 'change', { target: { value: 'make garden' } })
      button.simulate( 'click' )

      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        const data = JSON.parse( request.config.data )

        expect( request.url ).to.equal( `${__HOST__}/project/new` ) //eslint-disable-line
        expect( data.text ).to.equal( 'make garden' )
        done()
      })
    })

    it( 'calls onSubmit when button is clicked', () => {
      button.simulate( 'click' )
      expect( onSubmitSpy.calledOnce ).to.equal( true )
    })

    it( 'calls onSubmit when button is clicked', () => {
      button.simulate( 'click' )
      expect( generateItemSpy.calledOnce ).to.equal( true )
    })

    it( 'generateNewItem method returns an object with correct properties ', () => {
      input.simulate( 'change', { target: { value: 'baby cows' } })
      expect( wrapper.instance().generateNewItem().text ).to.eql( 'baby cows' )
    })

    it( 'calls addProject as part of onSubmit', done => {
      button.simulate( 'click' )

      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockProjectData.fakeProject1
        }).then( () => {
          expect( addProjectSpy.calledOnce ).to.equal( true )
          done()
        }).catch( done )
      })
    })
  })

  context( 'when adding a new could-do', () => {
    let input, button, addCouldDosSpy

    beforeEach( () => {
      moxios.install()
      addCouldDosSpy = sinon.spy( globalState, 'addCouldDo' )
      globalState.set( mockGlobalState )
      wrapper = mount( <FooterContainer type='could-do' currentProjectId={ 1 } /> )
      input = wrapper.find( 'input' )
      button = wrapper.find( 'button' )
    })

    afterEach( () => {
      addCouldDosSpy.restore()
      moxios.uninstall()
    })

    it( 'successfully calls "/could-do/new" when the type is \'could-do\'', done => {
      input.simulate( 'change', { target: { value: 'plant rose in garden' } })
      button.simulate( 'click' )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        const data = JSON.parse( request.config.data )

        expect( request.url ).to.equal( `${__HOST__}/could-do/new` ) // eslint-disable-line
        expect( data.text ).to.equal( 'plant rose in garden' )
        done()
      })
    })

    it( 'generateNewItem method returns an object with correct properties ', () => {
      input.simulate( 'change', { target: { value: 'baby cows' } })
      expect( wrapper.instance().generateNewItem() ).to.eql({ text: 'baby cows', project_id: 1 })
    })

    it( 'calls addCouldDos part of onSubmit', done => {
      button.simulate( 'click' )

      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockCouldDoData.fakeCouldDo1
        }).then( () => {
          expect( addCouldDosSpy.calledOnce ).to.equal( true )
          done()
        }).catch( done )
      })
    })

  })

  context( 'handles errors when database isn\'t updated', () => {
    let errorStub, button

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      wrapper = mount( <FooterContainer type='could-do' /> )
      button = wrapper.find( 'button' )
    })

    after( () => {
      errorStub.restore()
      moxios.uninstall()
    })

    it( 'catches and responds with an error', done => {
      button.simulate( 'click' )
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
    })


  })

})
