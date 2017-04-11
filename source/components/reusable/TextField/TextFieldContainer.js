import React, { Component } from 'react'
import axios from 'axios'
import TextField from './TextField'
import TextFieldInput from './TextFieldInput'
import globalState from '../../utilities/globalState'
import componentErrorHandler from '../../utilities/componentErrorHandler'

export default class TextFieldContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      inputValue: this.props.text,
      globalState: globalState.get()
    }
    this.toggleEditable = this.toggleEditable.bind( this )
    this.editInput = this.editInput.bind( this )
    this.handleKeyPress = this.handleKeyPress.bind( this )
  }

  toggleEditable() {
    this.setState({ editing: !this.state.editing })
  }

  editInput(event) {
    this.setState({ inputValue: event.target.value })
  }

  determineUpdateTarget() {
    let { type } = this.props
    let stateLocation = this.state.globalState[`${type}s`]

    if ( type === 'couldDo' ) {
      stateLocation = stateLocation[this.state.globalState.currentProjectId]
      type = 'could-do'
    }

    return { stateLocation, type }
  }

  handleKeyPress(event) {
    const { id } = this.props
    const { stateLocation, type } = this.determineUpdateTarget()
    if ( event.key === 'Enter' ) {
      const updatedState = stateLocation.map( element => {
        if ( element.id === id ) {
          return Object.assign(element, { text: this.state.inputValue })
        }
        return element
      })

      axios.post(`http://localhost:1337/${type}/edit/${id}`, {
        text: this.state.inputValue
      })
      .then( () => {
        globalState.set({ [stateLocation]: updatedState })
        this.setState({ editing: false })
      })
      .catch( componentErrorHandler('TextFieldContainer' ) )
    }
  }

  render() {
    const { text } = this.props
    const TextFieldDisplay = this.state.editing ?
      <TextFieldInput
        value={ this.state.inputValue }
        onChange={ this.editInput }
        onKeyUp={ this.handleKeyPress }
      /> :
      <TextField text={ text } onClick={ this.toggleEditable } />

    return <div>{ TextFieldDisplay }</div>
  }
}
