import MenuTopic from './MenuTopic';
import MenuItem from './MenuItem';

const S_MP_LEVEL_2 = { paddingLeft: 6 }
, COLOR_OPEN = "#80c040"
, _isArr = Array.isArray;

const MenuItems = ({
  items
}) => items
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
