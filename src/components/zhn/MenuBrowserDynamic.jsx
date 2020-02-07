import React, { Component } from 'react';

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ScrollPane from './ScrollPane';
import MenuPart from './MenuPart';

const CL_SCROLL = 'scroll-container-y scroll-menu';

const S = {
  BROWSER: {
    paddingRight: 0
  }
};

class MenuBrowserDynamic extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShow: !!props.isInitShow,
      isLoaded: false,
      menuItems: []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
    this._loadMenu()
  }
  componentDidUpdate(){
    const {isLoaded, isShow} = this.state;
    if (!isLoaded && isShow) {
      this._loadMenu()
    }
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  _loadMenu = () => {
    const { browserType, caption, sourceMenuUrl, onLoadMenu } = this.props;
    onLoadMenu({ browserType, caption, sourceMenuUrl });
  }

  _onStore = (actionType, data) => {
    const {
      browserType, store,
      showAction, updateAction, loadCompletedAction
    } = this.props;
    if (data === browserType) {
      if (actionType === showAction) {
        this._hShow();
      } else if (actionType === updateAction) {
        this.setState({
          menuItems: store.getBrowserMenu(browserType)
        });
      }
    } else if (data?.browserType === browserType
        && actionType === loadCompletedAction) {
      this.setState({
        menuItems: data.menuItems,
        isLoaded: true
      });
    }
  }

  _hHide = () => {
    this.setState({ isShow: false });
  }
  _hShow = () => {
    this.setState({ isShow: true });
  }

  _renderMenuParts = (menuItems=[]) => {
    return menuItems.map((menuPart, index) => {
      return (<MenuPart key={index} {...menuPart} />)
    });
  }

  render(){
    const {caption, children} = this.props
        , {menuItems, isShow} = this.state;

    return (
       <Browser isShow={isShow} style={S.BROWSER}>
         <BrowserCaption
            caption={caption}
            onClose={this._hHide}
         />
          <ScrollPane className={CL_SCROLL}>
            {this._renderMenuParts(menuItems)}
            {children}
          </ScrollPane>
       </Browser>
    )
  }
}

export default MenuBrowserDynamic;
