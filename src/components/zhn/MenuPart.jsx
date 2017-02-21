import React, { Component } from 'react';

import MenuBadge from './MenuBadge';
import OpenClose from './OpenClose';

class MenuPart extends Component {
  _renderMenuItems = (items) => {
    return items.map((item, index) => {
      const className = (index % 2) ? 'row__topic__even not-selected' : 'row__topic__odd not-selected';
      const menuBadge = (item.counter !== 0) ? (
                    <MenuBadge
                      counter={item.counter}
                      isOpen={item.isOpen}
                      onClick={item.onBadgeClick}
                      onBadgeClose={item.onBadgeClose}
                   />
                 ) : null;
      return (
         <div
             key={index}
             className={className}
             onClick={item.onClick}
          >
            {item.title}
            {menuBadge}
         </div>
      )
    })
  }

  render(){
    const {caption, isInitClose, items} = this.props;
    return (
      <OpenClose caption={caption} isClose={isInitClose}>
          {this._renderMenuItems(items)}
      </OpenClose>
    )
  }
}

export default MenuPart
