import { memo, useCallback } from 'react';

import useToggle from '../hooks/useToggle';
import ItemStack from './ItemStack';
import LegendItem from './LegendItem';

const CL_SCROLL = "with-scroll"
, CL_BT_ML = "bt-ml"
, MORE_MAX = 12;

const S = {
  MORE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 4,
    marginLeft: -8,
    transform: 'scaleX(-1)'
  },
  LESS: {
    height: 'auto',
  },
  DIV: {
    transform: 'scaleX(-1)'
  }
};

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

const _crLegendItem = (onClickItem, item) => (
  <LegendItem
    key={item.name}
    item={item}
    onClickItem={onClickItem}
 />
);

const Legend = memo(({ legend=[], onClickItem }) => {
  const [isMore, toggleIsMore] = useToggle(false)
  , _legendItems = isMore
       ? legend
       : legend.slice(0, MORE_MAX)
  , _crStackItem = useCallback(item =>
      _crLegendItem(onClickItem, item)
  , [onClickItem])
  , _style = isMore
       ? S.MORE
       : {...S.MORE, ...S.LESS};
  return (
    <div className={CL_SCROLL} style={_style}>
      <div style={S.DIV}>
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
