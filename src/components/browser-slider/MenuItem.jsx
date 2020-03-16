import React, { useCallback } from 'react'

import isKeyEnter from '../zhn/isKeyEnter'
import STYLE from './Style'

const CL = {
  ITEM: 'menu-item'
};

const MenuItem = ({ innerRef, item, onClick }) => {
  const { text, type } = item
  , _style = type === 'l'
      ? STYLE.ITEM_L
      : STYLE.ITEM_T
  , _hKeyDown = useCallback((evt) => {
      if (isKeyEnter(evt)) {
        evt.preventDefault()
        onClick()
      }
    }, [onClick]);
  return (
    <div
      ref={innerRef}
      className={CL.ITEM}
      style={_style}
      tabIndex="0"
      role="menuitem"
      onClick={onClick}
      onKeyDown={_hKeyDown}
   >
      {text}
    </div>
  );
}

export default MenuItem
