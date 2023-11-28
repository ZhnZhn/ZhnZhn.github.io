import {
  memo,
  useMemo
} from '../uiApi';

import { crScrollYCn } from '../styleFn'

import useBrowserShow from '../hooks/useBrowserShow';
import useToggle from '../hooks/useToggle';

import fFilterNotActive from './fFilterNotActive';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';
import BrowserContext from './BrowserContext';
import BrowserMenuMore from './BrowserMenuMore';
import MenuSlider from './MenuSlider';

const CL_SCROLL_Y = crScrollYCn()
, S_BROWSER = { paddingRight: 0 }
, S_BR_CAPTION = { paddingLeft: 6 }
, S_SVG_MORE = {
   position: 'relative',
   top: -4
}
, S_CAPTION = {
   position: 'relative',
   top: -3,
   paddingLeft: 4
}
, S_SCROLL_PANE = { height: '92%' };

const BrowserSlider = memo((props) => {
  const {
    caption
  } = props
  , [
    isShow,
    hide
  ] = useBrowserShow(props)
  , [
    isMenuMore,
    toggleMenuMore
  ] = useToggle()
  , [
    isFilterNotActive,
    toggleFilterNotActive
  ] = useToggle()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _browserContext = useMemo(
      () => fFilterNotActive(isFilterNotActive, props.dfProps.lT)
  , [isFilterNotActive]);
  //props.dfProps.lT
  /*eslint-enable react-hooks/exhaustive-deps */


  return (
    <BrowserContext.Provider value={_browserContext}>
      <Browser isShow={isShow} style={S_BROWSER}>
        <BrowserMenuMore
           is={isMenuMore}
           toggleMenu={toggleMenuMore}
           toggleFilter={toggleFilterNotActive}
        />
        <BrowserCaption
           style={S_BR_CAPTION}
           caption={caption}
           captionStyle={S_CAPTION}
           svgMoreStyle={S_SVG_MORE}
           onMore={toggleMenuMore}
           onClose={hide}
        />
         <ScrollPane
           className={CL_SCROLL_Y}
           style={S_SCROLL_PANE}
         >
           <MenuSlider {...props} />
         </ScrollPane>
      </Browser>
    </BrowserContext.Provider>
  );
})

export default BrowserSlider
