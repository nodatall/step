import React from 'react'
import { mount } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import CouldDoContainer from '../CouldDoContainer'
import globalState from '../../utilities/globalState'
import mockGlobalState from '../../../testUtilities/mockComponentData'

describe( ' <CouldDoContainer />', () => {

  it( 'checks logic of position prop', () => {
    globalState.set( mockGlobalState )
    const wrapper = mount( <CouldDoContainer /> )

    expect( wrapper.instance().findPosition( 0, 5 ) ).to.equal( 'first' )
    expect( wrapper.instance().findPosition( 4, 5 ) ).to.equal( 'last' )
    expect( wrapper.instance().findPosition( 3, 5 ) ).to.equal( 'other' )
  })

})
