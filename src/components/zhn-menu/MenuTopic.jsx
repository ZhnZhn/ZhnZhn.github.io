import React from 'react';
//import PropTypes from 'prop-types'

import OpenClose from '../zhn/OpenClose';
import MenuItems from './MenuItems'

const MenuTopic = ({
  style, openColor,
  caption, isInitOpen,
  items
}) => {
  const _isClose = isInitOpen === true
    ? false : true;
  return (
    <OpenClose
       isClose={_isClose}
       role="menuitem"
       caption={caption}
       style={style}
       openColor={openColor}
    >
       <MenuItems items={items} />
    </OpenClose>
  );
};

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
  )
}
*/

export default MenuTopic
