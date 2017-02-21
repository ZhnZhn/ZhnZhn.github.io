import React from 'react';

const S = {
  CAPTION : {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const ItemOption = ({ item={}, propCaption }) => (
  <div style={S.CAPTION}>
    {item[propCaption]}
  </div>
)

export default ItemOption
