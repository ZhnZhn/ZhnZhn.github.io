import React from 'react'

import useKeyEnter from '../hooks/useKeyEnter'

import LabelNew from './LabelNew'
import MenuBadge from './MenuBadge'
import MenuTopic from './MenuTopic'

const CL_ROW = "row__topic not-selected";

const S = {
  MP_LEVEL_2: {
    paddingLeft: 6
  },
  OPEN_COLOR: "#80c040"
}

const _isArr = Array.isArray;

const MenuItem = ({
  title, counter,
  isNew,
  isOpen, onBadgeClick, onBadgeClose,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);
  return (
  <div      
      tabIndex="0"
      role="menuitem"
      className={CL_ROW}
      onClick={onClick}
      onKeyDown={_hKeyDown}
   >
     {title}
     {counter !== 0
        ? <MenuBadge
           counter={counter}
           isOpen={isOpen}
           onClick={onBadgeClick}
           onBadgeClose={onBadgeClose}
        />
        : null
     }
     {isNew ? <LabelNew /> : null}
  </div>
  );
}

const MenuItems = ({ items }) => {
 return items.map((item, index) => _isArr(item.items)
   ? <MenuTopic
       {...item} key={index}
       style={S.MP_LEVEL_2}
       openColor={S.OPEN_COLOR}
     />
   : <MenuItem {...item} key={index} />
 )
};

export default MenuItems
