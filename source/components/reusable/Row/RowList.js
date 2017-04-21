import React from 'react'
import Row from '../Row/Row'

const RowList = ({ items, type }) => {
  let itemList = []

  if ( items ) {
    for ( const key in items ) {
      itemList.push(
        <Row key={ key } fieldType={ type } { ...items[key] } />
      )
    }
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
