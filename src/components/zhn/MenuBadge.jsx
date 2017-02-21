import React, { Component } from 'react';

const S = {
  BADGE_OPENED : {
    color: 'rgba(164, 135, 212, 1)'
  }
}

class MenuBadge extends Component {
  _handleClickBadge = (event) => {
     event.stopPropagation();
     if (!this.props.isOpen){
       this.props.onClick();
     } else {
       this.props.onBadgeClose();
     }
  }

  render(){
    const {counter, isOpen} = this.props;
    const spanStyle = isOpen
             ? S.BADGE_OPENED
             : null;
    return (
      <span
         className="menu__badge"
         style={spanStyle}
         onClick={this._handleClickBadge}>
         {counter}
      </span>
    )
  }
}

export default MenuBadge
