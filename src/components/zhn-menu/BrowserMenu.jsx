import useBool from '../hooks/useBool';
import useListen from '../hooks/useListen';
import useLoadMenu from './useLoadMenu';

import Comp from '../Comp';
import MenuTopicList from './MenuTopicList';

const {
  Browser,
  BrowserCaption,
  ScrollPane,
  SpinnerLoading
} = Comp;

const CL_SCROLL = 'scroll-container-y scroll-menu'
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
  ] = useLoadMenu(isShow, onLoadMenu);

  useListen((actionType, data) => {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser()
      } else if (actionType === updateAction) {
        updateMenu(store.getBrowserMenu(browserType))
      } else if (actionType === failedAction) {
        setFailed()
      }
    } else if (data?.browserType === browserType
        && actionType === loadedAction) {
        setLoaded(data.menuItems)
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
      <ScrollPane className={CL_SCROLL}>
         {isLoading && <SpinnerLoading />}
         <MenuTopicList menu={menu} />
         {children}
      </ScrollPane>
    </Browser>
  );
};

export default BrowserMenu
