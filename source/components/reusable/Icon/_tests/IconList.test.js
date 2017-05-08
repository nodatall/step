import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import IconList from '../IconList'

describe( '<IconList />', () => {
  let projectWrapper, couldDoWrapper

  beforeEach( () => {
    projectWrapper = mount(
      <IconList type='project' />
    )
    couldDoWrapper = mount(
      <IconList type='could-do' />
    )
  })

  afterEach( () => {
    projectWrapper.unmount()
    couldDoWrapper.unmount()
  })

  it( 'should render div with class \'iconlist-container\'', () =>
    expect( shallow( <IconList type='could-do' /> )
      .find( '.iconlist-container' ).length ).to.equal( 1 )
  )

  context( 'when type is project', () => {
    it( 'should not render the turnIntoProject Icon', () => {
      const hasIcon = projectWrapper.find( '.iconlist-container' ).children().nodes.find( icon => icon.props.type === 'intoProject' ) !== undefined
      expect( hasIcon ).to.equal( false )
    })
  })

  context( 'when type is could-do', () => {
    it( 'should render the turnIntoProject Icon', () => {
      const hasIcon = couldDoWrapper.find( '.iconlist-container' ).children().nodes.find( icon => icon.props.type === 'intoProject' ) !== undefined
      expect( hasIcon ).to.equal( true )
    })
  })

  context( 'when type is either could-do or project', () => {
    it( 'should render a delete Icon', () => {
      const couldDoWrapperHasIcon = couldDoWrapper.find( '.iconlist-container' ).children().nodes.find( icon => icon.props.type === 'delete' ) !== undefined
      const projectWrapperHasIcon = projectWrapper.find( '.iconlist-container' ).children().nodes.find( icon => icon.props.type === 'delete' ) !== undefined
      expect( couldDoWrapperHasIcon ).to.equal( true )
      expect( projectWrapperHasIcon ).to.equal( true )
    })
  })
})
