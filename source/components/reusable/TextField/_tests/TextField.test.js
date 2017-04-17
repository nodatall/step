import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import TextFieldContainer from '../TextFieldContainer'

describe( '<TextFieldContainer />', () => {
  let warnStub

  beforeEach( () => {
    warnStub = sinon.stub( console, 'warn' ).callsFake( () => null )
  })

  afterEach( () => {
    warnStub.restore()
  })

  it( 'calls toggleEditable on click', () => {
    const spy = sinon.spy( TextFieldContainer.prototype, 'toggleEditable' )
    const wrapper = mount( <TextFieldContainer /> )

    wrapper.find( 'TextField' ).simulate( 'click' )
    expect( spy.calledOnce ).to.equal( true )
    spy.restore()
  })


  it( 'calls editInput function', () => {
    const spy = sinon.spy( TextFieldContainer.prototype, 'editInput' )
    const wrapper = mount( <TextFieldContainer /> )

    wrapper.find( 'TextField' ).simulate( 'click' )
    const textChange = wrapper.find( 'TextFieldInput' )
    textChange.simulate( 'change' )
    expect( spy.calledOnce ).to.equal( true )
    spy.restore()
  })

  it( 'renders the child component', () =>
    expect( shallow( <TextFieldContainer /> ).find( 'TextField' ).length ).to.equal( 1 )
  )

})
