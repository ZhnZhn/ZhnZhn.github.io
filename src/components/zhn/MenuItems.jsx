import React from 'react'

import isKeyEnter from './isKeyEnter'
import LabelNew from './LabelNew';
import MenuBadge from './MenuBadge';

const CL_ROW = "row__topic not-selected";

const _hKeyDown = (onClick, event) => {
  if (isKeyEnter(event)) {
    onClick()
  }
};

const MenuItems = ({ items }) => {
 return items.map((item, index) => {
   const {
     title, counter,
     isNew,
     onClick
   } = item;
   return (
     <div
         key={index}
         className={CL_ROW}
         onClick={onClick}
         tabIndex="0"
         role="menuitem"
         onKeyDown={_hKeyDown.bind(null, onClick)}
      >
        {title}
        {counter !== 0
           ? <MenuBadge
              counter={counter}
              isOpen={item.isOpen}
              onClick={item.onBadgeClick}
              onBadgeClose={item.onBadgeClose}
           />
           : null
        }
        {isNew ? <LabelNew /> : null}
     </div>
  );
 })
};

export default MenuItems
