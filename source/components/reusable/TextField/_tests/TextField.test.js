import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import TextFieldContainer from '../TextFieldContainer'

describe( '<TextField />', () => {
  let wrapper, editInputSpy

  beforeEach( () => {
    editInputSpy = sinon.spy( TextFieldContainer.prototype, 'editInput' )
    wrapper = mount( <TextFieldContainer id={ 1 } projectId={ 1 } type='project' text='cows' /> )
  })

  afterEach( () => {
    editInputSpy.restore()
    wrapper.unmount()
  })

  it( 'calls editInput function', () => {
    wrapper.find( 'TextField' ).simulate( 'click' )
    wrapper.find( 'input' ).simulate( 'change' )
    expect( editInputSpy.calledOnce ).to.equal( true )
  })

  context( 'when editing is true', () => {

    it( 'render a .text-field-input', () => {
      wrapper.find( 'TextField' ).simulate( 'click' )
      expect( wrapper.find( '.text-field-input' ).length ).to.equal( 1 )
      expect( wrapper.find( '.text-field-text' ).length ).to.equal( 0 )
    })

  })

  context( 'when editing is false', () => {

    it( 'render a .text-field-text', () => {
      expect( wrapper.find( '.text-field-input' ).length ).to.equal( 0 )
      expect( wrapper.find( '.text-field-text' ).length ).to.equal( 1 )
    })

  })

})
