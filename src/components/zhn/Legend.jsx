import { memo } from 'react';

import useToggle from '../hooks/useToggle'
import LegendItem from './LegendItem';

const C = {
  CL_SCROLL: "with-scroll",
  MORE_MAX: 12,
  MORE: 'MORE',
  LESS: 'LESS'
};

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
  },

  BT_MORE: {
    display: 'inline-block',
    color: '#1b2836',
    marginTop: 10,
    marginLeft: 8,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

const BtMore = ({ isMore, legend, onClick }) => {
  const _len = legend.length;
  if (_len > C.MORE_MAX) {
    const _caption = isMore
      ? C.LESS + ': ' + C.MORE_MAX
      : C.MORE + ': +' + (_len - C.MORE_MAX);
    return (
      <button
        style={S.BT_MORE}
        onClick={onClick}
      >
        {_caption}
      </button>
    );
  } else {
    return null;
  }
}

const _renderLegend = (legend, isMore, onClickItem) => {
   const _legendItems = [], max = legend.length;
   let i=0;
   for (; i<max; i++){
     if ( (isMore) || (!isMore && i < C.MORE_MAX) ) {
       const item = legend[i];
       _legendItems.push(
         <LegendItem
            key={item.name}
            item={item}
            onClickItem={onClickItem}
         />
       )
     } else {
       break;
     }
   }
   return _legendItems;
}

const Legend = memo(({ legend=[], onClickItem }) => {
  const [isMore, toggleIsMore] = useToggle(false)
  , _style = isMore
       ? S.MORE
       : {...S.MORE, ...S.LESS};
  return (
    <div className={C.CL_SCROLL} style={_style}>
      <div style={S.DIV}>
        {_renderLegend(legend, isMore, onClickItem)}
        <BtMore
          isMore={isMore}
          legend={legend}
          onClick={toggleIsMore}
       />
      </div>
    </div>
  );
})

export default Legend
