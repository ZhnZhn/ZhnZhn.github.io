import React from 'react';

import Browser from './Browser';
import CaptionRow from '../CaptionRow';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';

import ShowHide from './ShowHide';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';

import ScrollPane from './ScrollPane';
import SpinnerLoading from './SpinnerLoading';
import MenuListType2 from './MenuListType2';

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name"

const CLASS = {
  BROWSER : "scroll-browser-by",
  BROWSER_WITH_SEARCH : "scroll-browser-by--search"
}

const STYLE = {
  BROWSER : {
    paddingRight: '0',
    minWidth: '300px'
  },
  WRAPPER_SEARCH : {
     paddingBottom: '8px',
     width: '100%',
     paddingRight: '24px'
  },
  SPINNER_LOADING : {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '32px',
    width: '32px',
    height: '32px'
  }
};


const MenuBrowserDynamic2 = React.createClass({
  getInitialState(){
    const { isInitShow } = this.props;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._handlerClickInfo },
      { caption: 'S', onClick: this._handlerClickSearch }
    ];

    return {
      isShow: isInitShow ? true : false,
      isShowSearch : false,
      scrollClass : CLASS.BROWSER,
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
  _handlerClickSearch(){
    if (this.state.isShowSearch){
      this.setState({
         isShowSearch: false,
         scrollClass: CLASS.BROWSER
       });
    } else {
      this.setState({
         isShowSearch: true,
         scrollClass: CLASS.BROWSER_WITH_SEARCH
       });
    }
  },


  _handlerClickItem(item){
    const {
      modalDialogType, browserType, chartContainerType,
      onShowLoadDialog, onShowContainer
    } = this.props;
    
    onShowLoadDialog(modalDialogType, {
      item, browserType, chartContainerType,
      onShow : onShowContainer
    });
  },

  render(){
    const {
            caption, children,
            ItemOptionComp, ItemComp
          } = this.props
        , { menuItems, isShow, isShowSearch, scrollClass } = this.state
        , _wrapperSearch = (menuItems.length !== 0)
               ? (
                   <ShowHide isShow={isShowSearch}>
                     <WrapperInputSearch
                       style={STYLE.WRAPPER_SEARCH}
                       placeholder={SEARCH_PLACEHOLDER}
                       data={menuItems}
                       ItemOptionComp={ItemOptionComp}
                       onSelect={this._handlerClickItem}
                     />
                   </ShowHide>
                 )
               : undefined
         , _spinnerLoading = (menuItems.length === 0)
               ? (<SpinnerLoading style={STYLE.SPINNER_LOADING}/>)
               : undefined
    return (
       <Browser isShow={isShow} style={STYLE.BROWSER}>
          <CaptionRow
             caption={caption}
             onClose={this._handlerHide}
          />
          <ToolbarButtonCircle
            buttons={this.toolbarButtons}
          />

          {_wrapperSearch}

          <ScrollPane className={scrollClass}>
            {_spinnerLoading}
            <MenuListType2
               model={menuItems}
               ItemComp={ItemComp}
               onClickItem={this._handlerClickItem}
            />
            {children}
          </ScrollPane>
       </Browser>
    )
  }
});


export default MenuBrowserDynamic2;
