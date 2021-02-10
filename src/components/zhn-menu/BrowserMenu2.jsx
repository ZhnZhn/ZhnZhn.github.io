import { useCallback, useMemo, useEffect } from 'react';

import use from '../hooks/use'
import useLoadMenu from './useLoadMenu'
import Comp from '../Comp'

import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';
import MenuItems2 from './MenuItems2';

const { useBool, useToggle, useListen } = use
, {
  Browser, BrowserCaption,
  ShowHide, ScrollPane,
  SpinnerLoading
} = Comp;

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


const BrowserMenu2 = ({
  isInitShow,
  store,
  browserType,
  showAction, loadedAction, failedAction,
  caption,
  onLoadMenu,
  descrUrl, onClickInfo,
  onShowLoadDialog,
  ItemOptionComp, ItemComp, children
}) => {
  const [isShow, showBrowser, hideBrowser] = useBool(isInitShow)
  , [isShowSearch, toggleSearch] = useToggle()
  , _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl)
  , [
      isLoading, isLoaded, menu,
      setLoading, setLoaded, setFailed
    ] = useLoadMenu();

  useListen(store, (actionType, data) => {
    if (data === browserType){
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === failedAction) {
        setFailed()
      }
    } else if (actionType === loadedAction && data.browserType === browserType){
      setLoaded(data.menuItems)
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (!isLoaded && isShow) {
      onLoadMenu()
      setLoading()
    }
  }, [isLoaded, isShow])
  /*eslint-enable react-hooks/exhaustive-deps */

  const _scrollClass = isShowSearch
    ? CL.BROWSER_WITH_SEARCH
    : CL.BROWSER;

  return (
    <Browser isShow={isShow} style={STYLE.BROWSER}>
        <BrowserCaption
           caption={caption}
           captionStyle={STYLE.CAPTION}
           onClose={hideBrowser}
        />
       <ToolbarButtonCircle
         buttons={_toolbarButtons}
       />
       {!isLoading && <ShowHide isShow={isShowSearch}>
           <WrapperInputSearch
             style={STYLE.WRAPPER_SEARCH}
             placeholder={SEARCH_PLACEHOLDER}
             data={menu}
             ItemOptionComp={ItemOptionComp}
             onSelect={onShowLoadDialog}
           />
         </ShowHide>
       }
       <ScrollPane className={_scrollClass}>
         {isLoading && <SpinnerLoading />}
         <MenuItems2
            model={menu}
            ItemComp={ItemComp}
            itemClassName={CL.ROW_ITEM}
            onClickItem={onShowLoadDialog}
         />
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default BrowserMenu2;
