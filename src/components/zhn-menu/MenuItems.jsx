import useKeyEnter from '../hooks/useKeyEnter'

import LabelNew from './LabelNew'
import MenuBadge from './MenuBadge'
import MenuTopic from './MenuTopic'

const CL_ROW = "row__topic not-selected"
, S_MP_LEVEL_2 = { paddingLeft: 6 }
, COLOR_OPEN = "#80c040"
, _isArr = Array.isArray;

const MenuItem = ({
  isNew,
  isOpen,
  title,
  counter,
  onBadgeClick,
  onBadgeClose,
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

const MenuItems = ({ items }) => items
 .map((item, index) => _isArr(item.items)
    ? <MenuTopic
        {...item}
        key={index}
        style={S_MP_LEVEL_2}
        openColor={COLOR_OPEN}
      />
    : <MenuItem
        {...item}
        key={index}
      />
 );

export default MenuItems
