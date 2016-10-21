import React from 'react';

const STYLE = {
  ITEM_DIV : {
    position: 'relative',
    minWidth : '350px',
    paddingRight: '10px',
    lineHeight : 1.4,
    paddingTop : '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN : {
    display: 'inline-block',
    verticalAlign : 'middle',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const Item = (props) => {
  const  {
           caption, className,
           item, onClickItem,
           children
         } = props
  return (
    <div
      className={className}
      style={STYLE.ITEM_DIV}
      onClick={onClickItem.bind(null, item)}
    >
      <span style={STYLE.ITEM_SPAN}>
        {caption}
      </span>
      {children}
   </div>
  );
};

export default Item
