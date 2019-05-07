import React, { Component } from 'react'

import MenuTab from './MenuTab'

class MenuTabItem extends Component {
  state = {
    isShow: false
  }

  _hClickTab = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow
    }))
  }
  _hCloseTab = (event) => {
     this.setState({ isShow: false })
  }
  _hRegTab = (node) => {
    this.tabNode = node
  }

  _renderChildren = (children, isShow) => {
    return React.Children.map(children, child => {
       return React.cloneElement(child, {
          isShow: isShow,
          onClose: this._hCloseTab
       });
    });
  }

  render(){
    const { style, caption, children } = this.props
        , { isShow } = this.state;
    return (
      <MenuTab
        style={style}
        isShow={isShow}
        caption={caption}
        onClick={this._hClickTab}
        onReg={this._hRegTab}
      >
        { this._renderChildren(children, isShow) }
     </MenuTab>
    );
  }
}

export default MenuTabItem
