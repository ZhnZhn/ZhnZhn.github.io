import { isArr, safeMap } from '../uiApi';

import MenuTopic from './MenuTopic';
import MenuItem from './MenuItem';

const S_MP_LEVEL_2 = { paddingLeft: 6 }
, COLOR_OPEN = "#80c040";

const MenuItems = ({
  items,
  itemStyle,
  topicStyle
}) => safeMap(items, (item, index) => isArr(item.items)
  ? <MenuTopic
      {...item}
      key={index}
      style={S_MP_LEVEL_2}
      openColor={COLOR_OPEN}
      itemStyle={itemStyle}
      topicStyle={topicStyle}
    />
  : <MenuItem
      {...item}
      style={itemStyle}
      key={index}
    />
);

export default MenuItems
