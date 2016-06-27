import React from 'react';

import Browser from './Browser';
import CaptionRow from '../CaptionRow';
import ScrollPane from './ScrollPane';
import MenuPart from './MenuPart';

const Styles = {
  browser : {
    paddingRight: '0'
  },
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    //height: 'calc(100vh - 90px)',
    paddingRight: '10px'
  }
};


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
    const { caption, children } = this.props
        , { menuItems, isShow } = this.state;
    return (
       <Browser isShow={isShow} style={Styles.browser}>
          <CaptionRow
             caption={caption}
             onClose={this._handlerHide}
          />
          <ScrollPane style={Styles.scrollDiv}>
            {this._renderMenuParts(menuItems)}
            {children}
          </ScrollPane>
       </Browser>
    )
  }
});


export default MenuBrowser;
