import { crScrollYCn } from '../styleFn';

import useBrowserShow from '../hooks/useBrowserShow';
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
    browserType,
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
    menu
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
