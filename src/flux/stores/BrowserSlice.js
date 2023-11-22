//import BrowserConfig from '../../constants/BrowserConfig';
//import { BT_STOCKS_BY_SECTORS } from '../../constants/BrowserType';
//import DataWL from '../../constants/DataWL';

import {
  BAT_SHOW_BROWSER_DYNAMIC,
  BAT_INIT_BROWSER_DYNAMIC,
  BAT_LOAD_BROWSER_DYNAMIC_COMPLETED,
  BAT_LOAD_BROWSER_FAILED
} from '../actions/BrowserActions';

import { showAlertDialog } from './compStore';

import {
  isWithItemCounter,
  initBrowserMenu
} from './browser/BrowserLogicFn';

import {
  getBrowserMenu,
  setBrowserMenu,
  //getRouterDialog,
  setRouterDialog
} from './browserLogic';

const FAILED = 'Failed';

const BrowserSlice = {
  isWithItemCounter: isWithItemCounter,
  
  onShowBrowserDynamicDone({ browserType }){
    this.trigger(BAT_SHOW_BROWSER_DYNAMIC, browserType);
  },
  onShowBrowserDynamicInit(elBrowser, option){
    const { browserType } = option;
    if (!getBrowserMenu(browserType)) {
      setBrowserMenu(browserType, []);
      this.trigger(BAT_INIT_BROWSER_DYNAMIC, elBrowser);
    }
  },
  onShowBrowserDynamicFailed(option){
    showAlertDialog(option)
    this.trigger(BAT_SHOW_BROWSER_DYNAMIC + FAILED)
  },

  onLoadBrowserDynamicCompleted(option){
    const { json, browserType } = option
    , menuItems = isWithItemCounter(browserType)
        ? initBrowserMenu(setBrowserMenu, setRouterDialog, option)
        : json;
    this.trigger(BAT_LOAD_BROWSER_DYNAMIC_COMPLETED, {
       menuItems, browserType
    })
  },
  onLoadBrowserDynamicFailed(option){
    const { alertItemId, caption, browserType } = option;
    option.alertItemId = alertItemId || caption
    showAlertDialog()
    this.trigger(BAT_LOAD_BROWSER_FAILED, browserType)
  }

}

export default BrowserSlice
