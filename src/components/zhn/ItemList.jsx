import { isArr, memo } from '../uiApi';

const UL_STYLE = { listStyle: 'none' }
, _crKeyDf = (_, index) => index;

const ItemList = memo(({
  items,
  crKey=_crKeyDf,
  crItem
}) => isArr(items) ? (
    <ul style={UL_STYLE}>
      {items.map((item, index) => (
        <li key={crKey(item, index)}>
          {crItem(item)}
        </li>
      ))}
    </ul>
  ) : null
);

export default ItemList
