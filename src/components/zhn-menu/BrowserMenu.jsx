import React, { useState, useCallback, useEffect } from 'react';

import useListen from '../hooks/useListen'
import Comp from '../Comp'
import MenuTopic from './MenuTopic'

const S = {
  CL_SCROLL: 'scroll-container-y scroll-menu',
  BROWSER: {
    paddingRight: 0
  },
  CAPTION: {
    top: 9
  }
}

const {
  Browser,
  BrowserCaption,
  ScrollPane
} = Comp

const _crMenu = (arrMenu=[], isLoaded=true) => ({
  arrMenu,
  isLoaded
});

const BrowserMenu = ({
  isInitShow,
  caption,
  store,
  browserType,
  showAction, updateAction, loadCompletedAction,
  sourceMenuUrl, onLoadMenu,
  children
}) => {
  const [isShow, setIsShow] = useState(!!isInitShow)
  , [menu, setMenu] = useState(() => _crMenu([], false))
  , { arrMenu, isLoaded } = menu
  , _hHide = useCallback(() => setIsShow(false), []);

  useListen(store, (actionType, data) => {
    if (data === browserType) {
      if (actionType === showAction) {
        setIsShow(true)
      } else if (actionType === updateAction) {
        setMenu(_crMenu(
          store.getBrowserMenu(browserType)
        ))
      }
    } else if (data?.browserType === browserType
        && actionType === loadCompletedAction) {
         setMenu(_crMenu(data.menuItems))
    }
  })
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (!isLoaded && isShow) {
      onLoadMenu({ browserType, caption, sourceMenuUrl });
    }
  }, [isLoaded, isShow])
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <Browser isShow={isShow} style={S.BROWSER}>
      <BrowserCaption
         caption={caption}
         captionStyle={S.CAPTION}
         onClose={_hHide}
      />
       <ScrollPane className={S.CL_SCROLL}>
         {arrMenu.map(
           (menuTopic, index) => (
               <MenuTopic key={index} {...menuTopic} />)
         )}
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default BrowserMenu;
