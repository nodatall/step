import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import FooterContainer from '../FooterContainer'

describe( '<FooterContainer />', () => {

  context( 'handles tests for rendering components and accepting inputs', () => {
    const wrapper = mount( <FooterContainer type='project' /> )
    const input = wrapper.find( 'input' )

    it( 'renders the child component', () =>
      expect( shallow( <FooterContainer /> ).find( 'Footer' ).length ).to.equal( 1 )
    )

    it( 'checks that the input element is being read', () => {
      input.simulate( 'change', { target: { value: 'make garden' } })
      expect( input.props().value ).to.equal( 'make garden' )
    })

  })

  context( 'handles tests for projects', () => {
    let wrapper, input, button

    before( () => {
      moxios.install()
      wrapper = mount( <FooterContainer type='project' /> )
      input = wrapper.find( 'input' )
      button = wrapper.find( 'button' )
    })

    after( () => {
      moxios.uninstall()
    })


    it( 'successfully calls "/project/new" when the type is \'project\'', done => {
      input.simulate( 'change', { target: { value: 'make garden' } })
      button.simulate( 'click' )

      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        const data = JSON.parse( request.config.data )

        expect( request.url ).to.equal( `${__HOST__}/project/new` ) //eslint-disable-line
        expect( data.text ).to.equal( 'make garden' )
        expect( data.user_id ).to.equal( 9000 )
        done()
      })
    })
  })

  context( 'handles tests for couldDos', () => {
    let wrapper, input, button

    before( () => {
      moxios.install()
      wrapper = mount( <FooterContainer type='could-do' /> )
      input = wrapper.find( 'input' )
      button = wrapper.find( 'button' )
    })

    after( () => {
      moxios.uninstall()
    })

    it( 'successfully calls "/could-do/new" when the type is \'could-do\'', done => {
      input.simulate( 'change', { target: { value: 'plant rose in garden' } })
      button.simulate( 'click' )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        const data = JSON.parse( request.config.data )

        expect( request.url ).to.equal( `${__HOST__}/could-do/new` ) // eslint-disable-line
        expect( data.text ).to.equal( 'plant rose in garden' )
        expect( data.user_id ).to.equal( 9000 )
        done()
      })

    })

  })

  context( 'handles errors when database isn\'t updated', () => {
    let errorStub, wrapper, button

    before( () => {
      moxios.install()
      errorStub = sinon.stub( console, 'error' ).callsFake( () => null )
      wrapper = mount( <FooterContainer type='could-do' /> )
      button = wrapper.find( 'button' )
    })

    after( () => {
      errorStub.restore()
      moxios.uninstall()
    })

    it( 'catches and responds with an error', done => {
      button.simulate( 'click' )
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        return request.respondWith({
          status: 400,
          response: 'fakeError'
        }).then( () => {
          expect( errorStub.calledTwice ).to.equal( true )
          done()
        }).catch( done )
      })
    })

  })

})
