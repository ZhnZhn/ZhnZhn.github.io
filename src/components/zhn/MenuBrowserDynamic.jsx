import React, { useState, useCallback, useEffect } from 'react';

import useListen from '../hooks/useListen'
import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ScrollPane from './ScrollPane';
import MenuParts from './MenuParts'

const CL_SCROLL = 'scroll-container-y scroll-menu';

const S = {
  BROWSER: {
    paddingRight: 0
  }
};

const _crMenu = (menuItems, isLoaded=true) => ({
  menuItems,
  isLoaded
});

const MenuBrowserDynamic = ({
  isInitShow,
  caption,
  store,
  browserType,
  showAction, updateAction, loadCompletedAction,
  sourceMenuUrl, onLoadMenu,
  children
}) => {
  const [isShow, setIsShow] = useState(!!isInitShow)
  , [menu, setMenu] = useState(_crMenu([], false))
  , { menuItems, isLoaded } = menu
  , _hHide = useCallback(() => setIsShow(false), [])

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

  useEffect(()=>{
    if (!isLoaded && isShow) {
      onLoadMenu({ browserType, caption, sourceMenuUrl });
    }
  }, [isLoaded, isShow])

  return (
    <Browser isShow={isShow} style={S.BROWSER}>
      <BrowserCaption
         caption={caption}
         onClose={_hHide}
      />
       <ScrollPane className={CL_SCROLL}>
         <MenuParts menuItems={menuItems} />
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default MenuBrowserDynamic;
