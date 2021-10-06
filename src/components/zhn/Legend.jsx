import { memo, useCallback } from 'react';

import useToggle from '../hooks/useToggle';
import ItemStack from './ItemStack';
import LegendItem from './LegendItem';

const CL_SCROLL = "with-scroll"
, CL_BT_ML = "bt-ml"
, MORE_MAX = 12
, S_MORE = {
  overflowY: 'auto',
  height: 250,
  paddingRight: 4,
  marginLeft: -8,
  transform: 'scaleX(-1)'
}
, S_LESS = { height: 'auto' }
, S_DIV = { transform: 'scaleX(-1)' };

const _crBtCaption = (isMore, len) => isMore
 ? `Less: ${MORE_MAX}`
 : `More: ${len - MORE_MAX}`;

const BtMoreOrLess = ({ isMore, legend, onClick }) => {
  const _len = legend.length;
  return _len > MORE_MAX
    ? (<button className={CL_BT_ML} onClick={onClick}>
        {_crBtCaption(isMore, _len)}
      </button>) : null;
};

const _crLegendItem = (item, index, onClickItem) => (
  <LegendItem
    key={item.name + index}
    item={item}
    onClickItem={onClickItem}
 />
);

const Legend = memo(({ legend=[], onClickItem }) => {
  const [isMore, toggleIsMore] = useToggle(false)
  , _legendItems = isMore
       ? legend
       : legend.slice(0, MORE_MAX)
  , _crStackItem = useCallback((item, index) =>
      _crLegendItem(item, index, onClickItem)
  , [onClickItem])
  , _style = isMore
       ? S_MORE
       : {...S_MORE, ...S_LESS};
  return (
    <div className={CL_SCROLL} style={_style}>
      <div style={S_DIV}>
        <ItemStack
           items={_legendItems}
           crItem={_crStackItem}
        />
        <BtMoreOrLess
          isMore={isMore}
          legend={legend}
          onClick={toggleIsMore}
       />
      </div>
    </div>
  );
});

export default Legend
