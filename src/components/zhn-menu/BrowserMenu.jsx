import { crScrollYCn } from '../styleFn';

import useBrowserShow from '../hooks/useBrowserShow';
import { useRefFocusIf } from '../hooks/useFocus';
import useLoadMenu from './useLoadMenu';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';
import { SpinnerLoading } from '../zhn/Spinner';
import MenuTopicList from './MenuTopicList';

const CL_SCROLL_MENU = crScrollYCn('scroll-menu');

const BrowserMenu = (props) => {
  const {
    caption,
    browserType,
    itemStyle,
    topicStyle,
    useMsBrowserLoad,
    onLoadMenu,
    children
  } = props
  , [
    isShow,
    hideBrowser,
    hKeyDown
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
  , refFirstItem = useRefFocusIf(
    isShow && menu
  );
  return (
    <Browser
       isShow={isShow}
       onKeyDown={hKeyDown}
    >
      <BrowserCaption
         caption={caption}
         onClose={hideBrowser}
      />
      <ScrollPane className={CL_SCROLL_MENU}>
         {isLoading && <SpinnerLoading />}
         <MenuTopicList
            refFirstItem={refFirstItem}
            menu={menu}
            itemStyle={itemStyle}
            topicStyle={topicStyle}
         />
         {children}
      </ScrollPane>
    </Browser>
  );
};

export default BrowserMenu
