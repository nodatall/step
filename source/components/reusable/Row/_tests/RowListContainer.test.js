import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { MemoryRouter } from 'react-router'
import { mockProjects } from 'sym/source/testUtilities'
import RowListContainer from '../RowListContainer'

describe( '<RowListContainer />', () => {
  const type = 'project'
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <MemoryRouter>
        <RowListContainer type={ type } items={ mockProjects } />
      </MemoryRouter>
    )
  })

  afterEach( () => {
    wrapper.unmount()
  })

  it( 'renders a <RowList />', () =>
    expect( wrapper.find( 'RowList' ).nodes.length ).to.equal( 1 )
  )

})
