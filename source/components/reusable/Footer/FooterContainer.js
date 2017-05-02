import React, { Component } from 'react'
import axios from 'axios'
import Footer from './Footer'
import globalState from '../../utilities/globalState'
import componentErrorHandler from '../../utilities/componentErrorHandler'

export default class FooterContainer extends Component {
  constructor( props ) {
    super( props )
    this.state = { inputValue: '' }

    this.onChange = this.onChange.bind( this )
    this.addItem = this.addItem.bind( this )
    this.handleKeyUp = this.handleKeyUp.bind( this )
  }

  onChange( event ) { this.setState({ inputValue: event.target.value }) }

  addItem() {
    const { type } = this.props
    const newItem = this.generateNewItem()
    axios.post( `${__HOST__}/${type}/new`, newItem ) //eslint-disable-line
      .then( response => {
        switch ( type ) {
          case 'could-do':
            globalState.addCouldDo( response.data )
            break
          case 'project':
            globalState.addProject( response.data )
            break
          default:
        }
        this.setState({ inputValue: '' })
      })
    .catch( componentErrorHandler( 'FooterContainer' ) )
  }

  generateNewItem() {
    const { type, currentProjectId: project_id } = this.props
    const { inputValue: text, } = this.state
    let newItem = { text }

    if ( type === 'could-do' ) {
      newItem = Object.assign( newItem, { project_id } ) // eslint-disable-line
    }
    return newItem
  }

  handleKeyUp( event ) {
    if ( event.key === 'Enter' ) {
      this.addItem()
    }
  }

  render() {
    return <Footer
      type={ this.props.type }
      addItem={ this.addItem }
      value={ this.state.inputValue }
      onChange={ this.onChange }
      onKeyUp={ this.handleKeyUp }
    />
  }
}
