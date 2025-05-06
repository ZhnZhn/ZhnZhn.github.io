import { isArr, safeMap } from '../uiApi';

import MenuTopic from './MenuTopic';
import MenuItem from './MenuItem';

const S_MP_LEVEL_2 = { paddingLeft: 6 }
, COLOR_OPEN = "#80c040";

const MenuItems = (props) => safeMap(
  props.items,
  (item, index) => isArr(item.items)
    ? <MenuTopic
        key={index}
        {...item}
        style={S_MP_LEVEL_2}
        openColor={COLOR_OPEN}
        itemStyle={props.itemStyle}
        topicStyle={props.topicStyle}
      />
    : <MenuItem
        key={index}
        {...item}
        style={props.itemStyle}
      />
);

export default MenuItems
