import { crScrollYCn } from '../styleFn';

import useBrowserShow from '../hooks/useBrowserShow';
import useListen from '../hooks/useListen';
import useLoadMenu from './useLoadMenu';
import useBrowserMenu from './useBrowserMenu';

import Comp from '../Comp';
import MenuTopicList from './MenuTopicList';

const {
  Browser,
  BrowserCaption,
  ScrollPane,
  SpinnerLoading
} = Comp;

const CL_SCROLL_MENU = crScrollYCn('scroll-menu')
, S_BROWSER = { paddingRight: 0 };

const BrowserMenu = (props) => {
  const {
    caption,
    store,
    browserType,
    updateAction,
    useMsBrowserLoad,
    onLoadMenu,
    children
  } = props
  , [
    isShow,
    hideBrowser
  ] = useBrowserShow(props)
  , [
    isLoading,
    menu,
    updateMenu
  ] = useLoadMenu(
    isShow,
    onLoadMenu,
    useMsBrowserLoad,
    browserType
  )
  , refFirstItem = useBrowserMenu(
     isShow,
     menu
  );

  useListen((actionType, data) => {
    if (data === browserType && actionType === updateAction) {
      updateMenu(store.getBrowserMenu(browserType))
    }
  })

  return (
    <Browser
       isShow={isShow}
       style={S_BROWSER}
    >
      <BrowserCaption
         caption={caption}
         onClose={hideBrowser}
      />
      <ScrollPane className={CL_SCROLL_MENU}>
         {isLoading && <SpinnerLoading />}
         <MenuTopicList
            menu={menu}
            refFirstItem={refFirstItem}
         />
         {children}
      </ScrollPane>
    </Browser>
  );
};

export default BrowserMenu
