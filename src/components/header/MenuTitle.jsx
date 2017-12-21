import React, { Component } from 'react'

import MenuAriaItem from './MenuAriaItem'

const S = {
  ROOT: {
    position: 'relative',
    paddingLeft: '32px',
    color: '#a487d4'
  },
  ARROW: {
    position: 'absolute',
    top: '0',
    left: '16px'
  }
};

class MenuTitle extends Component {
  render(){
    const { title, CL, onClick, onReg } = this.props;
    if (!title) {
      return null;
    }
    return (
      <MenuAriaItem
        className={CL.TITLE}
        style={S.ROOT}
        onClick={onClick}
        onReg={onReg}
      >
        {title}
        <span style={S.ARROW}>
          {'<'}
        </span>
      </MenuAriaItem>
    );
  }
}

export default MenuTitle
