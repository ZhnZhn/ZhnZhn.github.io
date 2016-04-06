import React from 'react';

import OpenClose from './OpenClose';

const MenuPart = React.createClass({

  _renderMenuItems(items){
    return items.map((item, index) => {
      const className = (index % 2) ? 'row__topic__even' : 'row__topic__odd';
      return (
         <div key={index} className={className} onClick={item.onClick}>
            {item.title}
         </div>
      )
    })
  },

  render(){
    const {caption, items} = this.props;
    return (
      <OpenClose caption={caption}>
          {this._renderMenuItems(items)}
      </OpenClose>
    )
  }
});

export default MenuPart
