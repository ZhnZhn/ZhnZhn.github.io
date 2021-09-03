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

const S = {
  BROWSER: {
    paddingRight: 0
  },
  BR_CAPTION: {
    paddingLeft: 6
  },
  CAPTION: {
    top: 0,
    paddingLeft: 4
  },
  SCROLL_PANE: {
    height: '92%'
  }
};


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
      <A.Browser isShow={isShow} style={S.BROWSER}>
        <BrowserMenuMore
          is={isMenuMore}
          toggleMenu={toggleMenuMore}
          toggleFilter={toggleFilterNotActive}
        />
        <A.BrowserCaption
           style={S.BR_CAPTION}
           caption={caption}
           captionStyle={S.CAPTION}
           onMore={toggleMenuMore}
           onClose={hide}
        />
         <A.ScrollPane
           className={CL_SCROLL}
           style={S.SCROLL_PANE}
         >
           <MenuSlider {...props} />
         </A.ScrollPane>
      </A.Browser>
    </BrowserContext.Provider>
  );
})

export default BrowserSlider
