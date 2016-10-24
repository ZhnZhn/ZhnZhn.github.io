import React from 'react';

const STYLE = {
  CAPTION : {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const ItemOption = (props) => {
  const { item, propCaption } = props;
  return (
    <div style={STYLE.CAPTION}>
      {item[propCaption]}
    </div>
  );
}

export default ItemOption
