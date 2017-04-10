import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import globalState from '../../../utilities/globalState'
import GlobalStateComponent from '../GlobalStateComponent'

describe( 'component utilities', () => {

  context( '<GlobalStateComponent />', () => {
    let wrapper, unsubscribeSpy

    before( () => {
      unsubscribeSpy = sinon.spy( globalState, 'unsubscribe' )
      wrapper = mount( <GlobalStateComponent /> )
    })

    after( () => {
      unsubscribeSpy.restore()
    })

    it( 'calls unsubscribe method of globalState on unmount', () => {
      wrapper.unmount()
      expect( unsubscribeSpy.calledOnce ).to.equal( true )
    })

  })

})
