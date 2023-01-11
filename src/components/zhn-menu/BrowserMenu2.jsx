import { useMemo } from '../uiApi';
import useBool from '../hooks/useBool';
import useToggle from '../hooks/useToggle';
import useListen from '../hooks/useListen';
import useLoadMenu from './useLoadMenu';

import Comp from '../Comp'

import ToolbarButtonCircle from '../zhn/ToolbarButtonCircle';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';
import MenuItems2 from './MenuItems2';

const {
  Browser,
  BrowserCaption,
  ShowHide,
  ScrollPane,
  SpinnerLoading
} = Comp;

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name"
, CL_BROWSER = "scroll-browser-by"
, CL_BROWSER_WITH_SEARCH = "scroll-browser-by--search"
, CL_ROW_ITEM = 'row__type2-topic not-selected'

, S_BROWSER = {
  paddingRight: 0,
  paddingBottom: 4,
  minWidth: 300
}
, S_WRAPPER_SEARCH = {
  width: '100%',
  paddingBottom: 8,
  paddingRight: 24
};

const _useToolbarButtons = (
  toggleSearch,
  onClickInfo,
  descrUrl
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _hClickInfo = useMemo(() => () => {
     onClickInfo({ descrUrl })
  }, []);
  // onClickInfo, descrUrl
  return useMemo(() => [
     { caption: 'S', title: 'Click to toggle input search', onClick: toggleSearch },
     { caption: 'A', title: 'About Datasources', onClick: _hClickInfo }
  ], [_hClickInfo])
  // toggleSearch
  /*eslint-enable react-hooks/exhaustive-deps */
};


const BrowserMenu2 = ({
  isInitShow,
  //store,
  browserType,
  showAction,
  loadedAction,
  failedAction,
  caption,
  onLoadMenu,
  descrUrl,
  onClickInfo,
  onShowLoadDialog,
  ItemOptionComp,
  ItemComp,
  children
}) => {
  const [
    isShow,
    showBrowser,
    hideBrowser
  ] = useBool(isInitShow)
  , [
    isShowSearch,
    toggleSearch
  ] = useToggle()
  , _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl)
  , [
    isLoading,
    menu,
    setLoaded,
    setFailed
  ] = useLoadMenu(isShow, onLoadMenu)
  , _scrollClass = isShowSearch
     ? CL_BROWSER_WITH_SEARCH
     : CL_BROWSER;

  useListen((actionType, data) => {
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

  return (
    <Browser isShow={isShow} style={S_BROWSER}>
        <BrowserCaption
           caption={caption}
           onClose={hideBrowser}
        />
       <ToolbarButtonCircle
         buttons={_toolbarButtons}
       />
       {!isLoading && <ShowHide isShow={isShowSearch}>
           <WrapperInputSearch
             style={S_WRAPPER_SEARCH}
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
            itemClassName={CL_ROW_ITEM}
            onClickItem={onShowLoadDialog}
         />
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default BrowserMenu2;
