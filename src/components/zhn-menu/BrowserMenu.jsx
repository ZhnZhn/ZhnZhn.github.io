import { useEffect } from 'react'

import use from '../hooks/use'
import useLoadMenu from './useLoadMenu'
import Comp from '../Comp'
import MenuTopic from './MenuTopic'

const { useBool, useListen } = use
, {
  Browser,
  BrowserCaption,
  ScrollPane,
  SpinnerLoading
} = Comp;

const CL_SCROLL = 'scroll-container-y scroll-menu'
, S_BROWSER = { paddingRight: 0 };



/*
const LOADING = 'a'
, LOADED = 'b'
, FAILED = 'c'
, UPDATE = 'd'
, _crAction = (type, menu) => ({ type, menu })
, initialState = {
  isLoaded: false,
  isLoading: false,
  menu: [],
};

const _reducer = (state, {type, menu}) => {
  switch(type){
    case LOADING: return { ...state, isLoading: true };
    case LOADED: return {
      isLoading: false,
      isLoaded: true,
      menu
    };
    case FAILED: return { ...initialState };
    case UPDATE: return { ...state, menu };
    default: return state;
  }
};
*/

const BrowserMenu = ({
  isInitShow,
  caption,
  store,
  browserType,
  showAction, updateAction,
  loadedAction, failedAction,
  onLoadMenu,
  children
}) => {
  const [isShow, showBrowser, hideBrowser] = useBool(isInitShow)
  , [
      isLoading, isLoaded, menu,
      setLoading, setLoaded, setFailed,
      updateMenu
    ] = useLoadMenu();
  //, [{isLoading, isLoaded, menu}, dispatch] = useReducer(_reducer, initialState)

  useListen(store, (actionType, data) => {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser()
      } else if (actionType === updateAction) {
        updateMenu(store.getBrowserMenu(browserType))
        //dispatch(_crAction(UPDATE, store.getBrowserMenu(browserType)))
      } else if (actionType === failedAction) {
        setFailed()
        //dispatch(_crAction(FAILED))
      }
    } else if (data?.browserType === browserType
        && actionType === loadedAction) {
        setLoaded(data.menuItems)
        //dispatch(_crAction(LOADED, data.menuItems))
    }
  })
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (!isLoaded && isShow) {
      onLoadMenu()
      setLoading()
      //dispatch(_crAction(LOADING))
    }
  }, [isLoaded, isShow])
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <Browser isShow={isShow} style={S_BROWSER}>
      <BrowserCaption
         caption={caption}
         onClose={hideBrowser}
      />
       <ScrollPane className={CL_SCROLL}>
         {isLoading && <SpinnerLoading />}
         {menu.map((menuTopic, index) => (
            <MenuTopic key={index} {...menuTopic} />)
         )}
         {children}
       </ScrollPane>
    </Browser>
  );
};

export default BrowserMenu;
