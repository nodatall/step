import React, { Component } from 'react'
import RowList from './RowList'

export default class RowListContainer extends Component {
  constructor( props ) {
    super( props )
    this.state = { items: null, localOrderUpdate: false }
    this.updateLocalItemOrder = this.updateLocalItemOrder.bind( this )
  }

  componentWillReceiveProps() {
    this.setState({ localOrderUpdate: false })
  }

  updateLocalItemOrder( afterSort ) {
    const { items } = this.props

    for ( const key in items ) {
      const newOrder = afterSort.filter( item => item.id === key )[0].order
      items[key].order = newOrder
    }

    this.setState({ items, localOrderUpdate: true })
  }

  render() {
    const { type } = this.props
    const { items } = this.localOrderUpdate ? this.state : this.props
    return ( 
      <RowList items={ items } type={ type } updateLocalItemOrder={ this.updateLocalItemOrder } />
    )
  }
}
