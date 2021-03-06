import React, { Component } from 'react'
import axios from 'axios'
import TextField from './TextField'
import globalState from '../../utilities/globalState'
import componentErrorHandler from '../../utilities/componentErrorHandler'

export default class TextFieldContainer extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      editing: false,
      inputValue: this.props.text
    }

    this.makeEditable = this.makeEditable.bind( this )
    this.editInput = this.editInput.bind( this )
    this.handleKeyPress = this.handleKeyPress.bind( this )
    this.onDocumentClick = this.onDocumentClick.bind( this )
  }

  onDocumentClick( event ) {
    if ( event.target.className !== 'text-field-input' ) {
      this.setState({ editing: false })
      window.removeEventListener( 'mouseup', this.onDocumentClick )
    }
  }

  makeEditable() {
    window.addEventListener( 'mouseup', this.onDocumentClick )
    this.setState({ editing: true }) 
  }

  editInput( event ) { this.setState({ inputValue: event.target.value }) }

  handleKeyPress( event ) {
    const { id, type } = this.props
    const { inputValue: text } = this.state

    if ( event.key === 'Enter' ) {
      axios.post( `/${type}/edit/${id}`, { text } ) //eslint-disable-line
        .then( () => {
          switch ( type ) {
            case 'project':
              globalState.updateProjectText( id, text )
              break
            case 'could-do':
              globalState.updateCouldDoText( id, text )
              break
            default:
          }
          this.setState({ editing: false })
        })
        .catch( componentErrorHandler( 'TextFieldContainer' ) )
    }
  }

  render() {
    const { editing, inputValue } = this.state
    return (
      <TextField
        editing={ editing }
        value={ inputValue }
        onChange={ this.editInput }
        onKeyUp={ this.handleKeyPress }
        onClick={ this.makeEditable } />
    )
  }
}
