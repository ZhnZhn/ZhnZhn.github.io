import React, { Component } from 'react'

import MenuTab from './MenuTab'

class MenuTabItem extends Component {
  constructor(props){
    super()
    this.state = {
      isShow: false
    }
  }

  _handleClickTab = () => {    
    this.setState({ isShow: !this.state.isShow })
  }
  _handleCloseTab = (event) => {
    if (!this.tabNode.contains(event.target)) {
      this.setState({ isShow: false })
    }
  }
  _handleRegTab = (node) => {
    this.tabNode = node
  }

  _renderChildren = (children, isShow) => {
    return React.Children.map(children, child => {
       return React.cloneElement(child, {
          isShow: isShow,
          onClose: this._handleCloseTab
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
        onClick={this._handleClickTab}
        onReg={this._handleRegTab}
      >
        { this._renderChildren(children, isShow) }
     </MenuTab>
    );
  }
}

export default MenuTabItem
