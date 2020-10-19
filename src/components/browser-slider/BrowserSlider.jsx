import { memo, useState, useCallback } from 'react'

import useListen from '../hooks/useListen'
import A from '../Comp'

import MenuSlider from './MenuSlider'

const CL_SCROLL = 'scroll-container-y';

const S = {
  BROWSER: {
    paddingRight: 0
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
  const [isShow, setIsShow] = useState(!!isInitShow)
  , _hHide = useCallback(()=>{ setIsShow(false) }, []);

  useListen(store, (actionType, data) => {
    if (actionType === showAction && data === browserType){
      setIsShow(true)
    }
  })

  return (
    <A.Browser isShow={isShow} style={S.BROWSER}>
      <A.BrowserCaption
         caption={caption}
         onClose={_hHide}
      />
       <A.ScrollPane
         className={CL_SCROLL}
         style={S.SCROLL_PANE}
       >
         <MenuSlider {...props} />
       </A.ScrollPane>
    </A.Browser>
  );
})

export default BrowserSlider
