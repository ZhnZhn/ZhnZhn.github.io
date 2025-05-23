//import { useMemo } from '../uiApi';
import { CL_ROW_TYPE2_TOPIC } from '../styleFn';

import useBrowserShow from '../hooks/useBrowserShow';
import { useToggle } from '../hooks/useToggle';
import { useRefInit } from '../hooks/useProperty';
import useLoadMenu from './useLoadMenu';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ShowHide from '../zhn/ShowHide';
import ScrollPane from '../zhn/ScrollPane';
import { SpinnerLoading } from '../zhn/Spinner';
import {
  crToolbarButton,
  ToolbarButtonCircle
} from '../zhn/ToolbarButtonCircle';
import WrapperInputSearch from '../zhn-select/WrapperInputSearch';
import MenuItems2 from './MenuItems2';

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name"
, CL_BROWSER = "scroll-browser-by"
, CL_BROWSER_WITH_SEARCH = `${CL_BROWSER}--search`

, S_BROWSER = {
  paddingBottom: 4,
  minWidth: 300
}
, S_TOOLBAR = {
  paddingTop: 0
}
, S_WRAPPER_SEARCH = {
  width: '100%',
  paddingBottom: 8,
  paddingRight: 24
};

const BrowserMenu2 = (props) => {
  const {
    browserType,
    useMsBrowserLoad,
    caption,
    onLoadMenu,
    descrUrl,
    onClickInfo,
    onShowLoadDialog,
    ItemOptionComp,
    ItemComp,
    children
  } = props
  , [
    isShow,
    hideBrowser,
    hKeyDown
  ] = useBrowserShow(props)
  , [
    isShowSearch,
    toggleSearch
  ] = useToggle()
  , _toolbarButtons = useRefInit(() => [
    crToolbarButton('S','Click to toggle input search',toggleSearch),
    crToolbarButton('A','About Datasources',() => { onClickInfo({ descrUrl }) })
  ])
  , [
    isLoading,
    menu,
  ] = useLoadMenu(
    isShow,
    onLoadMenu,
    useMsBrowserLoad,
    browserType
  )
  , _scrollClass = isShowSearch
     ? CL_BROWSER_WITH_SEARCH
     : CL_BROWSER;

  return (
    <Browser
       isShow={isShow}
       style={S_BROWSER}
       onKeyDown={hKeyDown}
    >
       <BrowserCaption
          caption={caption}
          onClose={hideBrowser}
       />
       <ToolbarButtonCircle style={S_TOOLBAR}>
          {_toolbarButtons}
       </ToolbarButtonCircle>
       {menu && <ShowHide isShow={isShowSearch}>
          <WrapperInputSearch
             style={S_WRAPPER_SEARCH}
             placeholder={SEARCH_PLACEHOLDER}
             data={menu}
             ItemOptionComp={ItemOptionComp}
             onSelect={onShowLoadDialog}
          />
       </ShowHide>}
       <ScrollPane className={_scrollClass}>
          {isLoading && <SpinnerLoading />}
          {menu && <MenuItems2
             model={menu}
             ItemComp={ItemComp}
             itemClassName={CL_ROW_TYPE2_TOPIC}
             onClickItem={onShowLoadDialog}
          />}
          {children}
       </ScrollPane>
    </Browser>
  );
};

export default BrowserMenu2
