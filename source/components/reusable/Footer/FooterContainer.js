import React from 'react'
import axios from 'axios'
import Footer from './Footer'
import globalState from '../../utilities/globalState'
import GlobalStateComponent from '../ParentClasses/GlobalStateComponent'
import componentErrorHandler from '../../utilities/componentErrorHandler'

const FooterContainerError = componentErrorHandler( 'FooterContainer' )

export default class FooterContainer extends GlobalStateComponent {
  constructor( props ) {
    super( props )
    Object.assign( this.state, { value: '' } ) // eslint-disable-line
    this.onChange = this.onChange.bind( this )
    this.onSubmit = this.onSubmit.bind( this )
  }

  onChange( event ) {
    this.setState({ value: event.target.value })
  }

  determineTargets() {
    let { type } = this.props
    let stateLocation = this.state[`${type}s`]

    if ( type === 'couldDo' ) {
      stateLocation = stateLocation[this.statecurrentProjectId]
      type = 'could-do'
    }

    return { stateLocation, type }
  }

  generateNewItem( type ) {
    const { value: text, userId: user_id, currentProjectId: project_id } = this.state
    let newItem = { text, user_id }

    if ( type === 'could-do' ) {
      newItem = Object.assign( newItem, { project_id } ) // eslint-disable-line
    }

    return newItem
  }

  onSubmit() {
    const { type: target } = this.props
    const { type, stateLocation } = this.determineTargets()
    const newItem = this.generateNewItem( type )

    axios.post( `${__HOST__}/${type}/new`, newItem ) //eslint-disable-line
      .then( response => {
        newItem.id = response.data.id
        stateLocation.push( newItem )
        globalState.set({ [`${target}s`]: this.state[`${target}s`] })
      })
      .catch( error => FooterContainerError( error ) )
  }

  render() {
    return <Footer
      type={ this.props.type }
      onSubmit={ this.onSubmit }
      value={ this.state.value }
      onChange={ this.onChange }
    />
  }
}
