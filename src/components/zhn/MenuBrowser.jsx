import React from 'react';


import CaptionRow from '../CaptionRow';
import MenuPart from './MenuPart';


import ContainerStyles from '../styles/ContainerStyles.js';
const styles = ContainerStyles;


const MenuBrowser = React.createClass({
  getInitialState: function(){
    const {store, browserType, isShow} = this.props;
    //const isShowBrowser = isShow ? true : false;
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
    this.state.isShow = false;
    this.setState(this.state);
  },

  _handlerShow: function(){
    this.state.isShow = true;
    this.setState(this.state);
  },


  _renderMenuParts(menuItems){
    return menuItems.map((menuPart, index) => {
      return (<MenuPart key={index} {...menuPart} />)
    });
  },

  render: function(){
    const {caption, children} = this.props;
    const {menuItems} = this.state;


    let styleOpen = this.state.isShow ? {display: 'block'} : {display: 'none'};
    let classOpen = this.state.isShow ? "show-popup" : null;
    return (
       <div className={classOpen} style={Object.assign({}, styles.browserRootDiv, styleOpen)}>
         <CaptionRow
            caption={caption}
            onClose={this._handlerHide}
         />
         {this._renderMenuParts(menuItems)}
         {children}
       </div>
    )
  }
});


export default MenuBrowser;
