import React from 'react';

import Browser from './Browser';
import CaptionRow from '../CaptionRow';
import MenuPart from './MenuPart';

const MenuBrowser = React.createClass({
  getInitialState: function(){
    const {store, browserType, isShow} = this.props;
    return {
      isShow: isShow ? true : false,
      menuItems: store.getBrowserMenu(browserType)
    }
  },

  componentWillMount: function(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function(){
    this.unsubscribe();
  },

  _onStore: function(actionType, data){
     const {browserType, store, showAction, updateAction} = this.props;

     if (actionType === showAction && data === browserType ){
      this._handlerShow();
    } else if (actionType === updateAction && data === browserType){
      this.setState({menuItems: store.getBrowserMenu(browserType)})
    }
  },

  _handlerHide: function(){
    this.setState({isShow : false});
  },
  _handlerShow: function(){
    this.setState({isShow : true});
  },

  _renderMenuParts(menuItems){
    return menuItems.map((menuPart, index) => {
      return (<MenuPart key={index} {...menuPart} />)
    });
  },

  render: function(){
    const {caption, children} = this.props
        , {menuItems, isShow} = this.state;
    return (
       <Browser isShow={isShow}>
          <CaptionRow
             caption={caption}
             onClose={this._handlerHide}
          />
          {this._renderMenuParts(menuItems)}
          {children}
       </Browser>
    )
  }
});


export default MenuBrowser;
