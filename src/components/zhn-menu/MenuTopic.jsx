//import PropTypes from 'prop-types'
import { isArr } from '../uiApi';

import OpenClose from '../zhn/OpenClose';
import MenuItems from './MenuItems';
import MenuItem from './MenuItem';

const S_OC_STYLE = {
  paddingRight: 12,
  whiteSpace: 'nowrap'
}
, S_MENU_ITEM = {
  paddingLeft: 4
};

const MenuTopic = ({
  refFirstItem,
  style,
  openColor,
  caption,
  isInitOpen,
  items,
  ...restMenuItemProps
}) => isArr(items) ? (
  <OpenClose
     refItem={refFirstItem}
     role="menuitem"
     isClose={!(isInitOpen === true)}
     style={style}
     ocStyle={S_OC_STYLE}
     openColor={openColor}
     caption={caption}
  >
     <MenuItems items={items} />
  </OpenClose>
) : (
  <MenuItem
    {...restMenuItemProps}
    style={S_MENU_ITEM}
    refItem={refFirstItem}
  />
);

/*
MenuPart.propTypes = {
  isInitOpen: PropTypes.bool,
  caption: PropTypes.string,
  style: PropTypes.object,
  openColor: PropTypes.string,
  items: PropTypes.arrayOf(
     PropTypes.shape({
       isOpen: PropTypes.bool,
       title: PropTypes.string,
       counter: PropTypes.number,
       isNew: PropTypes.bool,
       onClick: PropTypes.func,
       onBadgeClick: PropTypes.func,
       onBadgeClose: PropTypes.func
     })
  ),

  isOpen: PropTypes.bool,
  title: PropTypes.string,
  counter: PropTypes.number,
  isNew: PropTypes.bool,
  onClick: PropTypes.func,
  onBadgeClick: PropTypes.func,
  onBadgeClose: PropTypes.func
}
*/

export default MenuTopic
