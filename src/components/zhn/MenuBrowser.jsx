import React, { Component } from 'react';

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ScrollPane from './ScrollPane';
import MenuPart from './MenuPart';

const CL_SCROLL = 'scroll-container-y scroll-menu';

const S = {
  BROWSER: {
    paddingRight: '0px'
  }
};

class MenuBrowser extends Component {
  constructor(props){
    super()
    const { store, browserType, isShow } = props;
    this.state = {
      isShow: isShow ? true : false,
      menuItems: store.getBrowserMenu(browserType)
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  _onStore = (actionType, data) => {
     const { browserType, store, showAction, updateAction } = this.props;
     if (actionType === showAction && data === browserType ){
      this._handleShow()
     } else if (actionType === updateAction && data === browserType){
      this.setState({ menuItems: store.getBrowserMenu(browserType) })
     }
  }

  _handleHide = () => {
    this.setState({ isShow : false })
  }
  _handleShow = () => {
    this.setState({ isShow : true })
  }

  _renderMenuParts = (menuItems) => {
    return menuItems.map((menuPart, index) => {
      return (<MenuPart key={index} {...menuPart} />);
    });
  }

  render(){
    const { caption, children } = this.props
        , { menuItems, isShow } = this.state;
    return (
       <Browser isShow={isShow} style={S.BROWSER}>
          <BrowserCaption
             caption={caption}
             onClose={this._handleHide}
          />
          <ScrollPane className={CL_SCROLL}>
            {this._renderMenuParts(menuItems)}
            {children}
          </ScrollPane>
       </Browser>
    );
  }
}

export default MenuBrowser
