import React, { Component } from 'react';
//import PropTypes from 'prop-types'

import isKeyEnter from './isKeyEnter'

import LabelNew from './LabelNew';
import MenuBadge from './MenuBadge';
import OpenClose from './OpenClose';

const CL_ROW = "row__topic not-selected";

class MenuPart extends Component {
  /*
  static propTypes = {
    caption: PropTypes.string,
    isOpen: PropTypes.bool,
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

  hKeyDown = (onClick, event) => {
    if (isKeyEnter(event)) {
      onClick()
    }
  }

  _renderMenuItems = (items) => {
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
             onKeyDown={this.hKeyDown.bind(null, onClick)}
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
  }

  render(){
    const {caption, isInitOpen, items} = this.props
        , _isClose = isInitOpen === true
              ? false : true;
    return (
      <OpenClose
         caption={caption}
         isClose={_isClose}
      >
          {this._renderMenuItems(items)}
      </OpenClose>
    )
  }
}

export default MenuPart
