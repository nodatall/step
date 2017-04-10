import { Component } from 'react'
import globalState from '../../utilities/globalState'

export default class GlobalStateComponent extends Component {
  constructor() {
    super()
    this.state = globalState.get()
    globalState.subscribe( this.updateState )
  }

  componentWillUnmount() { globalState.unsubscribe(this.updateState) }

  updateState = newState => this.setState( newState )

  render() { return null }
}
