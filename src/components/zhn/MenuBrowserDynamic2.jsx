import { Component } from 'react';

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
  CAPTION: {
    top: 9
  },
  WRAPPER_SEARCH : {
     width: '100%',
     paddingBottom: 8,
     paddingRight: 24
  }
};

class MenuBrowserDynamic2 extends Component {
  constructor(props){
    super(props);
    const { isInitShow } = props;
    this.toolbarButtons = [
      { caption: 'S', title: 'Click to toggle input search', onClick: this._handleClickSearch.bind(this) },
      { caption: 'A', title: 'About Datasources', onClick: this._handleClickInfo.bind(this) }
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
      this.setState({ menuItems: data.menuItems, isLoaded : true });
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
    this.setState(({isShowSearch}) => {
      const [is, scrollClass] = isShowSearch
        ? [false, CL.BROWSER]
        : [true, CL.BROWSER_WITH_SEARCH];
      return { isShowSearch: is, scrollClass };
    })
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
    , {
      menuItems,
      isShow, isShowSearch,
      scrollClass
    } = this.state
    , _isMenuEmpty = menuItems.length === 0;

    return (
       <Browser isShow={isShow} style={STYLE.BROWSER}>
           <BrowserCaption
              caption={caption}
              captionStyle={STYLE.CAPTION}
              onClose={this._handleHide}
           />
          <ToolbarButtonCircle
            buttons={this.toolbarButtons}
          />
          {!_isMenuEmpty && <ShowHide isShow={isShowSearch}>
              <WrapperInputSearch
                style={STYLE.WRAPPER_SEARCH}
                placeholder={SEARCH_PLACEHOLDER}
                data={menuItems}
                ItemOptionComp={ItemOptionComp}
                onSelect={this._handleClickItem}
              />
            </ShowHide>
          }
          <ScrollPane className={scrollClass}>
            {_isMenuEmpty && <SpinnerLoading />}
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
