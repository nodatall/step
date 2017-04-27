import React from 'react'
import sinon from 'sinon'
import globalState from 'sym/source/components/utilities/globalState'
import { mount, shallow } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { MemoryRouter } from 'react-router'
import RowContainer from '../RowContainer'

describe( '<RowContainer />', () => {
  let wrapper, setCurrentProjectIdSpy
  const wrapperProps = {
    fieldType: 'project',
    text: 'moo',
    id: 4,
    goToProject: () => null
  }

  it( 'renders a <Row />', () =>
    expect( shallow( <RowContainer /> ).find( 'Row' ).length ).to.equal( 1 )
  )

  beforeEach( () => {
    setCurrentProjectIdSpy = sinon.spy( globalState, 'setCurrentProjectId' )
    wrapper = mount(
      <MemoryRouter>
        <RowContainer { ...wrapperProps } />
      </MemoryRouter>
    )
  })


  afterEach( () => {
    setCurrentProjectIdSpy.restore()
    wrapper.unmount()
  })

  it( 'should pass all props to child <Row />', () => {
    const rowProps = wrapper.find( 'Row' ).props()
    expect( rowProps ).to.eql( wrapperProps )
  })

  context( 'goToProject()', () => {

    it( 'should call globalState.setCurrentProjectId()', () => {
      wrapper.find( 'RowContainer' ).nodes[0].goToProject()
      expect( setCurrentProjectIdSpy.called ).to.equal( true )
    })

    it( 'setCurrentProjectId is called with id prop', () => {
      wrapper.find( 'RowContainer' ).nodes[0].goToProject()
      expect( setCurrentProjectIdSpy.calledWith( wrapperProps.id ) ).to.equal( true )
    })

    it( 'calls browserHistory.push()', async () => {
      await wrapper.find( 'RowContainer' ).nodes[0].goToProject()
      expect( wrapper.find( 'RowContainer' ).nodes[0].context.router.history.entries[1].pathname )
        .to.equal( '/project' )
    })

  })

})
