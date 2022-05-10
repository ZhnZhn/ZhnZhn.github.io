import BrowserConfig from '../../constants/BrowserConfig';
import { BrowserType } from '../../constants/Type';
import DataWL from '../../constants/DataWL';

import {
  BAT_SHOW_BROWSER_DYNAMIC,
  BAT_INIT_BROWSER_DYNAMIC,
  BAT_LOAD_BROWSER_DYNAMIC_COMPLETED,
  BAT_LOAD_BROWSER_FAILED
} from '../actions/BrowserActions';

import {
  isWithItemCounter,
  initBrowserMenu,
  setIsOpen,
  plusCounter,
  resetCounter
} from './browser/BrowserLogic';

const FAILED = 'Failed';

const _setItemOpen = setIsOpen.bind(null, true)
, _setItemClose = setIsOpen.bind(null, false)
, _addCounter = plusCounter.bind(null, 1)
, _minusCounter = plusCounter.bind(null, -1);

const BrowserSlice = {
  browserMenu: {},
  routeDialog: {
    WL: DataWL
  },

  isWithItemCounter: isWithItemCounter,
  getBrowserMenu(browserType){
     return this.browserMenu[browserType];
  },
  setMenuItemOpen(cT, bT){
    _setItemOpen(this.browserMenu, bT, cT)
  },
  setMenuItemClose(cT, bT){
    _setItemClose(this.browserMenu, bT, cT)
  },
  addMenuItemCounter(cT, bT){
    _addCounter(this.browserMenu, bT, cT);
  },
  minusMenuItemCounter(cT, bT){
    _minusCounter(this.browserMenu, bT, cT);
  },
  resetMenuItemCounter(cT, bT){
    resetCounter(this.browserMenu, bT, cT)
  },
  getSourceConfig(browserId, sourceId){
    if (sourceId.indexOf(BrowserType.STOCKS_BY_SECTORS) > 0){
      return BrowserConfig[browserId];
    }
    const _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : void 0;
  },

  onShowBrowserDynamicDone({ browserType }){
    this.trigger(BAT_SHOW_BROWSER_DYNAMIC, browserType);
  },
  onShowBrowserDynamicInit(elBrowser, option){
    const { browserType } = option;
    if (!this.browserMenu[browserType]) {
      this.browserMenu[browserType] = [];
      this.trigger(BAT_INIT_BROWSER_DYNAMIC, elBrowser);
    }
  },
  onShowBrowserDynamicFailed(option){
    this.showAlertDialog(option)
    this.trigger(BAT_SHOW_BROWSER_DYNAMIC + FAILED)
  },

  onLoadBrowserDynamicCompleted(option){
    const { json, browserType } = option
    , menuItems = isWithItemCounter(browserType)
        ? initBrowserMenu(this, option)
        : json;
    this.trigger(BAT_LOAD_BROWSER_DYNAMIC_COMPLETED, {
       menuItems, browserType
    })
  },
  onLoadBrowserDynamicFailed(option){
    const { alertItemId, caption, browserType } = option;
    option.alertItemId = alertItemId || caption
    this.showAlertDialog(option);
    this.trigger(BAT_LOAD_BROWSER_FAILED, browserType)
  }

}

export default BrowserSlice
