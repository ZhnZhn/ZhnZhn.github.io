import { useCallback } from 'react';

import useKeyEnter from '../hooks/useKeyEnter';
import DivEllipsis from '../zhn/DivEllipsis';

const S_ITEM = {
   position: 'relative',
   minWidth: 350,
   padding: '5px 10px 5px 0',
   lineHeight: 1.4
}
, S_CAPTION = {
   verticalAlign: 'middle',
   width: '100%'
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
      style={S_ITEM}
      onClick={_hClick}
      onKeyDown={_hKeyDown}
    >
      <DivEllipsis
        style={S_CAPTION}
        text={caption}
      />
      {children}
   </div>
  );
};

export default Item
