import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import Row from '../Row'

describe( '<Row />', () => {

  it( 'renders a <TextFieldContainer />', () =>
    expect( shallow( <Row /> ).find( 'TextFieldContainer' ).length ).to.equal( 1 )
  )

  it( 'renders an <IconList />', () =>
    expect( shallow( <Row /> ).find( 'IconList' ).length ).to.equal( 1 )
  )

  context( 'has FieldType prop of project', () =>
    it( 'renders an <Icon />', () =>
      expect( shallow( <Row fieldType='project' /> ).find( 'Icon' ).length ).to.equal( 1 )
    )
  )
})
