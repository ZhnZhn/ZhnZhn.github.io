import React from 'react';
import accounting from 'accounting';

import Item from './Item';

const NA = 'n/a'
    , ML = ' ml';

const STYLE = {
  CAP : {
    paddingRight: '8px'
  },
  DATE : {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: '85px',
    float: 'right'
  }
}

const ItemLse = (props) => {
  const { item } = props
      , { cap, date } = item
      , _cap = (cap === 0)
          ? NA
          : accounting.formatMoney(cap, "£") + ML
  return (
    <Item {...props}>
    <div>
       <span style={STYLE.CAP}>
         {_cap}
       </span>
       <span style={STYLE.DATE}>
         {date}
       </span>
    </div>
    </Item>
  );
};

export default ItemLse
