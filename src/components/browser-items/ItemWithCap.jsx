import React from 'react';

import Item from './Item';
import RowCap from './RowCap';

const ItemWithCap = ({ caption, className, item, modalDialogType }) => {
  const { cap, salePrice, ipo} = item;
  return (
      <Item
        caption={caption}
        className={className}
        item={item}
        modalDialogType={modalDialogType}
      >
         <RowCap
           cap={cap}
           salePrice={salePrice}
           ipo={ipo}
         />
      </Item>
  );
};

export default ItemWithCap
