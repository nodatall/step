import React from 'react'
import { mount } from 'enzyme'
import { mockGlobalState } from 'sym/source/testUtilities/mockComponentData'
import { expect } from '../../../../configuration/testSetup'
import CouldDoContainer from '../CouldDoContainer'
import globalState from '../../utilities/globalState'

describe( ' <CouldDoContainer />', () => {

  it( 'checks logic of position prop', () => {
    globalState.set( mockGlobalState )
    const wrapper = mount( <CouldDoContainer /> )

    expect( wrapper.instance().findPosition( 0, 5 ) ).to.equal( 'beginning' )
    expect( wrapper.instance().findPosition( 4, 5 ) ).to.equal( 'end' )
    expect( wrapper.instance().findPosition( 3, 5 ) ).to.equal( 'middle' )

    wrapper.unmount()
  })

})
