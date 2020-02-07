import React, { useCallback } from 'react';

import isKeyEnter from '../zhn/isKeyEnter'

const STYLE = {
  ITEM_DIV: {
    position: 'relative',
    minWidth: 350,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 1.4
  },
  ITEM_SPAN: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',    
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

const Item = ({
   caption, className,
   item, onClickItem,
   children
  }) => {
  const _hKeyDown = useCallback((evt) => {
    if (isKeyEnter(evt)) {
      onClickItem(item)
    }
  }, []);
  return (
    <div
      role="menuitem"
      tabindex="0"
      className={className}
      style={STYLE.ITEM_DIV}
      onClick={onClickItem.bind(null, item)}
      onKeyDown={_hKeyDown}
    >
      <span style={STYLE.ITEM_SPAN}>
        {caption}
      </span>
      {children}
   </div>
  );
};

export default Item
