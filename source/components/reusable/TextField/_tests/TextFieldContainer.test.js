import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import moxios from 'moxios'
import globalState from 'sym/source/components/utilities/globalState'
import { expect } from 'sym/configuration/testSetup'
import { mockGlobalState } from 'sym/source/testUtilities/mockComponentData'
import TextFieldContainer from '../TextFieldContainer'

describe( '<TextFieldContainer />', () => {
  let warnStub, wrapper, makeEditableSpy, updateProjectTextSpy, updateCouldDoTextSpy
  const event = { key: 'Enter', target: { value: 'Cow Cow Moo Moo' } }

  beforeEach( () => {
    moxios.install()
    warnStub = sinon.stub( console, 'warn' ).callsFake( () => null )
    makeEditableSpy = sinon.spy( TextFieldContainer.prototype, 'makeEditable' )
    updateProjectTextSpy = sinon.spy( globalState, 'updateProjectText' )
    updateCouldDoTextSpy = sinon.spy( globalState, 'updateCouldDoText' )
    wrapper = mount( <TextFieldContainer /> )
    globalState.set( mockGlobalState )
  })

  afterEach( () => {
    warnStub.restore()
    makeEditableSpy.restore()
    updateProjectTextSpy.restore()
    updateCouldDoTextSpy.restore()
    wrapper.unmount()
    moxios.uninstall()
  })

  it( 'renders .text-field-input', () =>
    expect( wrapper.find( '.text-field-input' ).length ).to.equal( 1 )
  )

  it( 'calls makeEditable on click', () => {
    wrapper.find( '.text-field-input input' ).simulate( 'click' )
    expect( makeEditableSpy.calledOnce ).to.equal( true )
  })

  it( 'renders <TextField />', () =>
    expect( wrapper.find( 'TextField' ).length ).to.equal( 1 )
  )

  context( 'handleKeyPress()', () => {

    it( 'updates global state with new project when type is project', done => {
      wrapper = mount( <TextFieldContainer type='project' /> )
      wrapper.instance().makeEditable()
      wrapper.instance().handleKeyPress( event )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: ''
        }).then( () => {
          expect( updateProjectTextSpy.calledOnce ).to.equal( true )
          expect( updateCouldDoTextSpy.notCalled ).to.equal( true )
          done()
        }).catch( done )
      })
    })

    it( 'updates global state with new couldDo when type is couldDo', done => {
      wrapper = mount( <TextFieldContainer type='could-do' /> )
      wrapper.instance().makeEditable()
      wrapper.instance().handleKeyPress( event )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: ''
        }).then( () => {
          expect( updateCouldDoTextSpy.calledOnce ).to.equal( true )
          expect( updateProjectTextSpy.notCalled ).to.equal( true )
          done()
        }).catch( done )
      })
    })

    it( 'keyHandlePress sets state to false after enter', done => {
      wrapper = mount( <TextFieldContainer type='could-do' projectId='2' id='2' text='Sally Moos' /> )
      wrapper.instance().makeEditable()
      wrapper.instance().handleKeyPress( event )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: ''
        }).then( () => {
          expect( wrapper.state().editing ).to.equal( false )
          done()
        }).catch( done )
      })
    })

    it( 'handleKeyPress error handler', done => {
      wrapper = mount( <TextFieldContainer type='could-do' projectId='2' id='2' text='Sally Moos' /> )
      wrapper.instance().makeEditable()
      wrapper.instance().handleKeyPress( event )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: ''
        }).then( () => {
          expect( warnStub.calledTwice ).to.equal( true )
          done()
        }).catch( done )
      })
    })
  })

  it( 'editInput changes state to input value', () => {
    wrapper.instance().editInput( event )
    expect( wrapper.state().inputValue ).to.equal( 'Cow Cow Moo Moo' )
  })

})
