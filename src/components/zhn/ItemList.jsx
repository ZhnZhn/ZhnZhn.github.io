import {
  isArr,
  memo,
  IfTrue
} from '../uiApi';

const UL_STYLE = { listStyle: 'none' }
, _crKeyDf = (_, index) => index;

const ItemList = memo(({
  style,
  items,
  crKey=_crKeyDf,
  crItem
}) => (
  <IfTrue v={isArr(items)}>
    <ul style={{...UL_STYLE, ...style}}>
      {items.map((item, index) => (
        <li key={crKey(item, index)}>
          {crItem(item)}
        </li>
      ))}
    </ul>
  </IfTrue>
));

export default ItemList
