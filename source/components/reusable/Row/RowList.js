import React from 'react'
import Row from '../Row/Row'

const RowList = ({ items, type }) => {
  let itemList

  if ( items ) {
    itemList = items.map( item =>
      <Row key={ item.id } fieldType={ type } { ...item } />
    )
  } else {
    itemList = <div className='loading'> Loading . . . </div>
  }

  return (
    <div className={ `${type}-rowlist-container` }>
      { itemList }
    </div>
  )
}

export default RowList
