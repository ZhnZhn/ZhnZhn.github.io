import { useCallback } from 'react';

import isKeyEnter from '../zhn/isKeyEnter';
import {
  S_ITEM_L,
  S_ITEM_T
} from './Style';

const CL_MENU_ITEM = 'menu-item';

const MenuItem = ({ innerRef, item, onClick }) => {
  const { text, type } = item
  , _style = type === 'l'
      ? S_ITEM_L
      : S_ITEM_T
  , _hKeyDown = useCallback((evt) => {
      if (isKeyEnter(evt)) {
        evt.preventDefault()
        onClick()
      }
    }, [onClick]);
  return (
    <div
      ref={innerRef}
      className={CL_MENU_ITEM}
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
