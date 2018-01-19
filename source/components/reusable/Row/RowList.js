import React from 'react'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import _ from 'lodash'
import axios from 'axios'
import RowContainer from '../Row/RowContainer'
import globalState from '../../utilities/globalState'
import componentErrorHandler from '../../utilities/componentErrorHandler'

const RowList = ({ items, type, updateLocalItemOrder }) => {
  const itemList = []
  let itemsInOrder = []

  if ( items ) {
    for ( const key in items ) {
      itemList.push( items[key] )
    }
    itemsInOrder = _.sortBy( itemList, 'order' ).map( ( item, order ) => (
      <RowContainer useDragHandle key={ item.id } fieldType={ type } { ...item } order={ order } />
    ) )
  } else {
    itemsInOrder = <div className='loading'> Loading . . . </div>
  }

  const SortableList = SortableContainer( () => (
    <div className={ `${type}-rowlist-container` }>
      <ul>
        { itemsInOrder }
      </ul>
    </div>
  ) )

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const afterSort = arrayMove( itemsInOrder, oldIndex, newIndex ).map( ({ key: id }, index ) => ({
      id,
      order: index
    }) )

    updateLocalItemOrder( afterSort, type )

    switch ( type ) {
      case 'project':
        globalState.updateProjects( afterSort )
        break
      case 'could-do':
        globalState.updateCouldDos( afterSort )
        break
      default:
    }

    axios.post( `/${type}/order`, afterSort )
      .catch( componentErrorHandler( 'RowList' ) )
  }

  return (
    <SortableList onSortEnd={ onSortEnd } distance={ 1 } useDragHandle />
  )
}

export default RowList
