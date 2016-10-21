import React from 'react';

import Item from './Item';
import RowCap from './RowCap';

const ItemWithCap = (props) => {
  const { item } = props
      , { cap, salePrice, ipo} = item;
  return (
      <Item {...props}>
         <RowCap
           cap={cap}
           salePrice={salePrice}
           ipo={ipo}
         />
      </Item>
  );
};

export default ItemWithCap
