import React, { Component } from 'react';

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';

import ShowHide from './ShowHide';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';

import ScrollPane from './ScrollPane';
import SpinnerLoading from './SpinnerLoading';
import MenuListType2 from './MenuListType2';

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name"

const CL = {
  BROWSER : "scroll-browser-by",
  BROWSER_WITH_SEARCH : "scroll-browser-by--search",
  ROW_ITEM: 'row__type2-topic not-selected'
}

const STYLE = {
  BROWSER : {
    paddingRight: 0,
    paddingBottom: 4,
    minWidth: 300
  },
  WRAPPER_SEARCH : {
     width: '100%',
     paddingBottom: 8,
     paddingRight: 24
  },
  SPINNER_LOADING : {
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    margin: '0 auto',
    marginTop: 32,
    textAlign: 'middle'
  }
};

class MenuBrowserDynamic2 extends Component {
  constructor(props){
    super(props);
    const { isInitShow } = props;
    this.toolbarButtons = [
      { caption: 'I', onClick: this._handleClickInfo.bind(this) },
      { caption: 'S', onClick: this._handleClickSearch.bind(this) }
    ];
    this.state = {
      isShow: !!isInitShow,
      isShowSearch : false,
      scrollClass : CL.BROWSER,
      isLoaded : false,
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
    const { browserType, showAction, loadCompletedAction } = this.props;
    if (actionType === showAction && data === browserType){
      this._handleShow();
    } else if (actionType === loadCompletedAction && data.browserType === browserType){
      this.setState({ menuItems: data.json, isLoaded : true });
    }
  }

  _handleHide = () => {
    this.setState({isShow : false});
  }
  _handleShow = () => {
    this.setState({isShow : true});
  }

  _handleClickInfo = () => {
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  }
  _handleClickSearch = () => {
    if (this.state.isShowSearch){
      this.setState({
         isShowSearch: false,
         scrollClass: CL.BROWSER
       });
    } else {
      this.setState({
         isShowSearch: true,
         scrollClass: CL.BROWSER_WITH_SEARCH
       });
    }
  }

  _handleClickItem = (item) => {
    const {
      modalDialogType, browserType, chartContainerType,
      onShowLoadDialog, onShowContainer
    } = this.props;

    onShowLoadDialog(modalDialogType, {
      item, browserType, chartContainerType,
      onShow : onShowContainer
    });
  }

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
                       onSelect={this._handleClickItem}
                     />
                   </ShowHide>
                 )
               : null
         , _spinnerLoading = (menuItems.length === 0)
               ? (<SpinnerLoading style={STYLE.SPINNER_LOADING}/>)
               : null;
    return (
       <Browser isShow={isShow} style={STYLE.BROWSER}>
           <BrowserCaption
              caption={caption}
              onClose={this._handleHide}
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
               itemClassName={CL.ROW_ITEM}
               onClickItem={this._handleClickItem}
            />
            {children}
          </ScrollPane>
       </Browser>
    )
  }
}

export default MenuBrowserDynamic2;
