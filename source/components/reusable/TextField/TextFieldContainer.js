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
  
  componentDidMount() {
    window.addEventListener( 'mouseup', this.onDocumentClick )
  }
  
  componentWillUnmount() {
    window.removeEventListener( 'mouseup', this.onDocumentClick )
  }

  onDocumentClick( event ) {
    const targetClass = event.target.className
    if ( targetClass !== 'text-field-input' ) {
      this.setState({ editing: false })
    }
  }

  makeEditable() { this.setState({ editing: true }) }

  editInput( event ) { this.setState({ inputValue: event.target.value }) }

  handleKeyPress( event ) {
    const { id, type } = this.props
    const { inputValue: text } = this.state

    if ( event.key === 'Enter' ) {
      axios.post( `${__HOST__}/${type}/edit/${id}`, { text } ) //eslint-disable-line
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
      <div className='text-field-container' onClick={ this.makeEditable }>
        <TextField
          editing={ editing }
          value={ inputValue }
          onChange={ this.editInput }
          onKeyUp={ this.handleKeyPress } />
      </div>
    )
  }
}
