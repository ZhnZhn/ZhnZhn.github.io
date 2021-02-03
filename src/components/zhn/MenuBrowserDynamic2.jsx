import { useState, useCallback, useMemo, useEffect } from 'react';

import use from '../hooks/use'

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';

import ShowHide from './ShowHide';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';

import ScrollPane from './ScrollPane';
import SpinnerLoading from './SpinnerLoading';
import MenuListType2 from './MenuListType2';

const { useBool, useToggle, useListen } = use;

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name"

const CL = {
  BROWSER : "scroll-browser-by",
  BROWSER_WITH_SEARCH : "scroll-browser-by--search",
  ROW_ITEM: 'row__type2-topic not-selected'
};

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

const _useToolbarButtons = (toggleSearch, onClickInfo, descrUrl) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _hClickInfo = useCallback(() => {
     onClickInfo({ descrUrl })
  }, []);
  return useMemo(() => [
     { caption: 'S', title: 'Click to toggle input search', onClick: toggleSearch },
     { caption: 'A', title: 'About Datasources', onClick: _hClickInfo }
  ], [_hClickInfo])
  /*eslint-enable react-hooks/exhaustive-deps */
};


const MenuBrowserDynamic2 = ({
  isInitShow,
  store,
  browserType, showAction, loadCompletedAction,
  caption, sourceMenuUrl, onLoadMenu,
  descrUrl, onClickInfo,
  modalDialogType, chartContainerType, onShowLoadDialog, onShowContainer,
  ItemOptionComp, ItemComp, children
}) => {
  const [isShow, show, hide] = useBool(isInitShow)
  , [isShowSearch, toggleSearch] = useToggle()
  , [{isLoaded, menuItems}, setMenuItems] = useState({ isLoaded: false, menuItems: []})
  , _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickItem = useCallback(item =>
    onShowLoadDialog(modalDialogType, {
      item, browserType, chartContainerType,
      onShow: onShowContainer
    }), [])
  /*eslint-enable react-hooks/exhaustive-deps */


  useListen(store, (actionType, data) => {
    if (actionType === showAction && data === browserType){
      show();
    } else if (actionType === loadCompletedAction && data.browserType === browserType){
      setMenuItems({ menuItems: data.menuItems, isLoaded: true })
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (!isLoaded && isShow) {
      onLoadMenu({ browserType, caption, sourceMenuUrl });
    }
  }, [isLoaded, isShow])
  /*eslint-enable react-hooks/exhaustive-deps */

  const _isMenuEmpty = menuItems.length === 0
  , _scrollClass = isShowSearch
       ? CL.BROWSER_WITH_SEARCH
       : CL.BROWSER;

  return (
    <Browser isShow={isShow} style={STYLE.BROWSER}>
        <BrowserCaption
           caption={caption}
           captionStyle={STYLE.CAPTION}
           onClose={hide}
        />
       <ToolbarButtonCircle
         buttons={_toolbarButtons}
       />
       {!_isMenuEmpty && <ShowHide isShow={isShowSearch}>
           <WrapperInputSearch
             style={STYLE.WRAPPER_SEARCH}
             placeholder={SEARCH_PLACEHOLDER}
             data={menuItems}
             ItemOptionComp={ItemOptionComp}
             onSelect={_hClickItem}
           />
         </ShowHide>
       }
       <ScrollPane className={_scrollClass}>
         {_isMenuEmpty && <SpinnerLoading />}
         <MenuListType2
            model={menuItems}
            ItemComp={ItemComp}
            itemClassName={CL.ROW_ITEM}
            onClickItem={_hClickItem}
         />
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default MenuBrowserDynamic2;
