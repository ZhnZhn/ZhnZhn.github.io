import { useCallback } from 'react';

import useKeyEnter from '../hooks/useKeyEnter'

const S = {
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
   item,
   onClickItem,
   children
  }) => {
  /*eslint-disable react-hooks/exhaustive-deps*/
  const _hClick = useCallback(() => onClickItem(item), []);
  /*eslint-enable react-hooks/exhaustive-deps*/
  const _hKeyDown = useKeyEnter(_hClick);
  return (
    <div
      role="menuitem"
      tabIndex="0"
      className={className}
      style={S.ITEM_DIV}
      onClick={_hClick}
      onKeyDown={_hKeyDown}
    >
      <span style={S.ITEM_SPAN}>
        {caption}
      </span>
      {children}
   </div>
  );
};

export default Item
