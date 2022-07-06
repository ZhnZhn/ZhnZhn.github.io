import { useCallback } from 'react';

import useKeyEnter from '../hooks/useKeyEnter';
import { S_ELLIPSIS } from '../styles/GeneralStyles';

const S_ITEM_DIV = {
   position: 'relative',
   minWidth: 350,
   padding: '5px 10px 5px 0',
   lineHeight: 1.4
}
, S_ITEM_SPAN = {
   display: 'inline-block',
   verticalAlign: 'middle',
   width: '100%',
   ...S_ELLIPSIS
};


const Item = ({
   caption,
   className,
   item,
   onClickItem,
   children
}) => {
  /*eslint-disable react-hooks/exhaustive-deps*/
  const _hClick = useCallback(() => onClickItem(item), [])
  //onClickItem, item
  /*eslint-enable react-hooks/exhaustive-deps*/
  , _hKeyDown = useKeyEnter(_hClick);
  return (
    <div
      role="menuitem"
      tabIndex="0"
      className={className}
      style={S_ITEM_DIV}
      onClick={_hClick}
      onKeyDown={_hKeyDown}
    >
      <span style={S_ITEM_SPAN}>
        {caption}
      </span>
      {children}
   </div>
  );
};

export default Item
