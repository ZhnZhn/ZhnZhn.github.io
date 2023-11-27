import { crScrollYCn } from '../styleFn';

import useBool from '../hooks/useBool';
import useListen from '../hooks/useListen';
import useLoadMenu from './useLoadMenu';
import useBrowserMenu from './useBrowserMenu'

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

const BrowserMenu = ({
  isInitShow,
  caption,
  store,
  browserType,
  showAction,
  updateAction,
  loadedAction,
  failedAction,
  useMsBrowserLoad,
  onLoadMenu,
  children
}) => {
  const [
    isShow,
    showBrowser,
    hideBrowser
  ] = useBool(isInitShow)
  , [
    isLoading,
    menu,
    setLoaded,
    setFailed,
    updateMenu
  ] = useLoadMenu(isShow, onLoadMenu)
  , refFirstItem = useBrowserMenu(
     isShow,
     menu
  );


  useMsBrowserLoad(msBrowserLoad => {
    if (msBrowserLoad && msBrowserLoad.browserType === browserType) {
      const { menuItems } = msBrowserLoad;
      if (menuItems) {
        setLoaded(menuItems)
      } else {
        setFailed()
      }
    }
  })

  useListen((actionType, data) => {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser()
      } else if (actionType === updateAction) {
        updateMenu(store.getBrowserMenu(browserType))
      }
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
