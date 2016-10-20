import React from 'react';

import Browser from './Browser';
import CaptionRow from '../CaptionRow';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import ScrollPane from './ScrollPane';
import MenuListType2 from './MenuListType2';
//import MenuPart from './MenuPart';

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


const MenuBrowserDynamic2 = React.createClass({
  getInitialState(){
    const { isInitShow } = this.props;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._handlerClickInfo }
    ];

    return {
      isShow: isInitShow ? true : false,
      isLoaded : false,
      menuItems: []
    }
  },

  componentWillMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentDidMount(){
    this._loadMenu();
  },
  componentWillUpdate(nextProps, nextState){
     if (!nextState.isLoaded && nextState.isShow){
       this._loadMenu();
     }
  },
  componentWillUnmount(){
    this.unsubscribe();
  },

  _loadMenu(){
    const { browserType, caption, sourceMenuUrl, onLoadMenu } = this.props;
    onLoadMenu({ browserType, caption, sourceMenuUrl });
  },

  _onStore(actionType, data){
    const { browserType, showAction, loadCompletedAction } = this.props;
    if (actionType === showAction && data === browserType){
      this._handlerShow();
    } else if (actionType === loadCompletedAction && data.browserType === browserType){
      this.setState({ menuItems: data.json, isLoaded : true });
    }
  },

  _handlerHide(){
    this.setState({isShow : false});
  },
  _handlerShow(){
    this.setState({isShow : true});
  },

  _handlerClickInfo(){
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  render(){
    const {caption, children, modalDialogType, ItemComp} = this.props
        , {menuItems, isShow} = this.state;


    return (
       <Browser isShow={isShow} style={Styles.browser}>
          <CaptionRow
             caption={caption}
             onClose={this._handlerHide}
          />
          <ToolbarButtonCircle
            buttons={this.toolbarButtons}
          />
          <ScrollPane style={Styles.scrollDiv}>
            <MenuListType2
               model={menuItems}
               modalDialogType={modalDialogType}
               ItemComp={ItemComp}
            />
            {children}
          </ScrollPane>
       </Browser>
    )
  }
});


export default MenuBrowserDynamic2;
