import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import TextFieldContainer from '../TextFieldContainer'

describe( '<TextFieldContainer />', () => {
  let warnStub, wrapper, makeEditableSpy

  beforeEach( () => {
    warnStub = sinon.stub( console, 'warn' ).callsFake( () => null )
    makeEditableSpy = sinon.spy( TextFieldContainer.prototype, 'makeEditable' )
    wrapper = mount( <TextFieldContainer /> )
  })

  afterEach( () => {
    warnStub.restore()
    makeEditableSpy.restore()
    wrapper.unmount()
  })

  it( 'renders .text-field-container', () =>
    expect( wrapper.find( '.text-field-container' ).length ).to.equal( 1 )
  )

  it( 'calls makeEditable on click', () => {
    wrapper.find( '.text-field-container' ).simulate( 'click' )
    expect( makeEditableSpy.calledOnce ).to.equal( true )
  })

  it( 'renders <TextField />', () =>
    expect( wrapper.find( 'TextField' ).length ).to.equal( 1 )
  )

  // Write test for handleKeyPress

})
