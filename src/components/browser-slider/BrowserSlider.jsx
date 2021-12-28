import { memo, useMemo } from 'react';

import useBool from '../hooks/useBool';
import useToggle from '../hooks/useToggle';
import useListen from '../hooks/useListen';

import fFilterNotActive from './fFilterNotActive';

import A from '../Comp';
import BrowserContext from './BrowserContext';
import BrowserMenuMore from './BrowserMenuMore';
import MenuSlider from './MenuSlider';

const CL_SCROLL = 'scroll-container-y';

const S_BROWSER = { paddingRight: 0 }
, S_BR_CAPTION = { paddingLeft: 6 }
, S_SVG_MORE = {
  position: 'relative',
  top: -4
}
, S_CAPTION = {
    position: 'relative',
    top: -6,
    paddingLeft: 4
  }
, S_SCROLL_PANE = { height: '92%' };

const BrowserSlider = memo((props) => {
  const {
    isInitShow, caption,
    store, browserType, showAction
  } = props
  const [isShow, show, hide] = useBool(isInitShow)
  , [isMenuMore, toggleMenuMore] = useToggle()
  , [isFilterNotActive, toggleFilterNotActive] = useToggle()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _browserContext = useMemo(
      () => fFilterNotActive(isFilterNotActive, props.dfProps.lT)
  , [isFilterNotActive]);
  //props.dfProps.lT
  /*eslint-enable react-hooks/exhaustive-deps */

  useListen(store, (actionType, data) => {
    if (actionType === showAction && data === browserType){
      show()
    }
  })

  return (
    <BrowserContext.Provider value={_browserContext}>
      <A.Browser isShow={isShow} style={S_BROWSER}>
        <BrowserMenuMore
          is={isMenuMore}
          toggleMenu={toggleMenuMore}
          toggleFilter={toggleFilterNotActive}
        />
        <A.BrowserCaption
           style={S_BR_CAPTION}
           caption={caption}
           captionStyle={S_CAPTION}
           svgMoreStyle={S_SVG_MORE}             
           onMore={toggleMenuMore}
           onClose={hide}
        />
         <A.ScrollPane
           className={CL_SCROLL}
           style={S_SCROLL_PANE}
         >
           <MenuSlider {...props} />
         </A.ScrollPane>
      </A.Browser>
    </BrowserContext.Provider>
  );
})

export default BrowserSlider
