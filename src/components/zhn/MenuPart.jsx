import React, { Component } from 'react';

import LabelNew from './LabelNew';
import MenuBadge from './MenuBadge';
import OpenClose from './OpenClose';

class MenuPart extends Component {
  _renderMenuItems = (items) => {
    return items.map((item, index) => {      
      const menuBadgeEl = (item.counter !== 0)
                ? (
                    <MenuBadge
                      counter={item.counter}
                      isOpen={item.isOpen}
                      onClick={item.onBadgeClick}
                      onBadgeClose={item.onBadgeClose}
                   />
                 ) : null;
      const labelNewEl = (item.isNew)
              ? ( <LabelNew /> )
              : null;
      return (
         <div
             key={index}
             className="row__topic not-selected"
             onClick={item.onClick}
          >
            {item.title}
            {menuBadgeEl}
            {labelNewEl}
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
