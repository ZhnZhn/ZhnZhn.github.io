import React, { useState, useCallback } from 'react';

import useListen from '../hooks/useListen'

import Browser from './Browser';
import BrowserCaption from './BrowserCaption';
import ScrollPane from './ScrollPane';
import MenuParts from './MenuParts'
import S from './MenuBrowser.Style'

const MenuBrowser = ({
  caption,
  store, browserType, isShow,
  showAction, updateAction,
  children
}) => {
  const [is, setIs] = useState(!!isShow)
  , [menuItems, setMenuItems] = useState(store.getBrowserMenu(browserType))
  , _hHide = useCallback(() => setIs(false), []);

  useListen(store, (actionType, data) => {
    if (actionType === showAction && data === browserType ){
      setIs(true)
    } else if (actionType === updateAction && data === browserType){
      setMenuItems(store.getBrowserMenu(browserType))
    }
  })

  return (
    <Browser isShow={is} style={S.BROWSER}>
       <BrowserCaption
          caption={caption}
          captionStyle={S.CAPTION}
          onClose={_hHide}
       />
       <ScrollPane className={S.CL_SCROLL}>
         <MenuParts menuItems={menuItems} />
         {children}
       </ScrollPane>
    </Browser>
  );
}

export default MenuBrowser
