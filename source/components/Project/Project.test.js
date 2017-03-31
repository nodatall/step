import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '../../../configuration/testSetup'
import ProjectPresentation from './ProjectPresentation'

describe( '<ProjectPresentation />', () => {

  it( 'renders the first child component', () =>
    expect( shallow( <ProjectPresentation /> ).find( 'TextFieldContainer' ).length ).to.equal( 1 )
  )

  it( 'renders the second child component', () =>
    expect( shallow( <ProjectPresentation /> ).find( 'IconPresentation' ).length ).to.equal( 1 )
  )
})
