import React from 'react';
import accounting from 'accounting';

import Item from './Item';

const NA = 'n/a'
    , ML = ' ml';

const STYLE = {
  CAP : {
    paddingRight: '8px'
  },
  COUNTRY : {
    display: 'display-inline',
    color: 'gray',
    width: '35px',
    float: 'right'
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
      , { cap, c, date } = item
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
       <span style={STYLE.COUNTRY}>
         {c}
       </span>
    </div>
    </Item>
  );
};

export default ItemLse
