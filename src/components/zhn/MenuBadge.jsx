import React from 'react';

const MenuBadge = React.createClass({
  _handlerClickBadge(event){
     event.stopPropagation();
     if (!this.props.isOpen){
       this.props.onClick();
     } else {
       this.props.onBadgeClose();
     }
  },

  render(){
    const {counter, isOpen, onClick} = this.props;
    const spanStyle = isOpen ? {color: 'rgba(164, 135, 212, 1)'} : null;
    return (
      <span
         className="menu__badge"
         style={spanStyle}
         onClick={this._handlerClickBadge}>
         {counter}
      </span>
    )
  }
});

export default MenuBadge
