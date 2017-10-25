import React, { Component } from 'react';

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ScrollPane from './ScrollPane';
import MenuPart from './MenuPart';

const Styles = {
  browser : {
    paddingRight: '0'
  },
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
  }
};

class MenuBrowserDynamic extends Component{
  constructor(props){
    super();
    this.state = {
      isShow: props.isInitShow ? true : false,
      isLoaded : false,
      menuItems: []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
    this._loadMenu()
  }
  componentWillUpdate(nextProps, nextState){
     if (!nextState.isLoaded && nextState.isShow){
       this._loadMenu();
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
    const { browserType, store, showAction, updateAction, loadCompletedAction } = this.props;
    if (actionType === showAction && data === browserType){
      this._handleShow();
    } else if (actionType === loadCompletedAction && data.browserType === browserType){
      this.setState({ menuItems: data.menuItems, isLoaded : true });
    } else if (actionType === updateAction && data === browserType){
      this.setState({ menuItems: store.getBrowserMenu(browserType) });
    }
  }

  _handleHide = () => {
    this.setState({ isShow : false });
  }
  _handleShow = () => {
    this.setState({ isShow : true });
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
       <Browser isShow={isShow} style={Styles.browser}>
         <BrowserCaption
            caption={caption}
            onClose={this._handleHide}
         />
          <ScrollPane style={Styles.scrollDiv}>
            {this._renderMenuParts(menuItems)}
            {children}
          </ScrollPane>
       </Browser>
    )
  }
}

export default MenuBrowserDynamic;
