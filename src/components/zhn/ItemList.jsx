import { memo } from 'react';

const _isArr = Array.isArray
, UL_STYLE = { listStyle: 'none' }
, _crKeyDf = (_, index) => index;

const ItemList = memo(({
  items,
  crKey=_crKeyDf,
  crItem
}) => {
  if (!_isArr(items)) return null;
  return (
    <ul style={UL_STYLE}>
      {items.map((item, index) => (
        <li key={crKey(item, index)}>
          {crItem(item)}
        </li>
      ))}
    </ul>
  );
});

export default ItemList
