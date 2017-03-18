import React, { Component } from 'react'
import TextFieldPresentation from './TextFieldPresentation'
import TextFieldInputPresentation from './TextFieldInputPresentation'
import globalState from '../globalState'

export default class TextFieldContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      inputValue: this.props.text,
      globalState: globalState.get()
    }
  }

  toggleEditable = () => {
    this.setState({ editing: !this.state.editing })
  }

  editInput = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleKeyPress = event => {
    const { type, id } = this.props

    if ( event.key === 'Enter' ) {
      const updatedState = this.state.globalState[type].map( element => {
        if ( element.id === id ) {
          return Object.assign(element, { text: this.state.inputValue })
        }
        return element
      })

      fetch(`http://localhost:3200/project/edit/${id}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ text: this.state.inputValue })
      })
      .then( () => {
        globalState.set({ [type]: updatedState })
        this.setState({ editing: false })
      })
    }
  }

  render() {
    const { text } = this.props
    const TextField = this.state.editing ?
      <TextFieldInputPresentation
        value={ this.state.inputValue }
        onChange={ this.editInput }
        onKeyUp={ this.handleKeyPress }
      /> :
      <TextFieldPresentation text={ text } onClick={ this.toggleEditable } />

    return <div>{ TextField }</div>
  }
}
