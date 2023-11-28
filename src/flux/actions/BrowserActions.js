import Reflux from 'reflux-core';

import { getBrowserMenu } from '../stores/browserLogic';
import { crAsyncBrowser } from '../logic/Factory';
import BrowserConfig from '../../constants/BrowserConfig';

import {
  BT_NDL,
  BT_EUROSTAT,
  BT_WATCH_LIST
} from '../../constants/BrowserType';

import { loadModalDialogs } from '../../components/dialogs/RouterModalDialog';
import { loadDialogs } from '../logic/RouterDialog';

export const BAT_SHOW_BROWSER_DYNAMIC = 'showBrowserDynamic'
export const BAT_INIT_BROWSER_DYNAMIC = 'initBrowserDynamic'
export const BAT_UPDATE_WATCH_BROWSER = 'updateWatchBrowser'
export const BAT_UPDATE_BROWSER_MENU = 'updateBrowserMenu'

const BA = Reflux.createActions({
  [BAT_SHOW_BROWSER_DYNAMIC]: {
    children: ['done', 'init', 'failed']
  },  

  [BAT_UPDATE_WATCH_BROWSER]: {}
});

const ERR_LOAD = "Failed to load browser."
, ERR_FOUND = "Browser hasn't found."
, ERR_ITEM = "Browser";

const _crErr = (
  alertDescr,
  alertItemId
) => ({
  alertDescr,
  alertItemId
});

BA[BAT_SHOW_BROWSER_DYNAMIC].listen(function(option={}){
  const _option = typeof option === 'string'
    ? { browserType: option }
    : option
  , { browserType:bT } = _option
  , config = BrowserConfig[bT];
  if (bT && config) {
    if (getBrowserMenu(bT)) {
      this.done(_option)
    } else {
      Promise.all([
        loadModalDialogs(bT),
        loadDialogs(bT)
      ])
      .then(() => crAsyncBrowser(config))
      .then(elBrowser => {
        this.init(elBrowser, config)
      })
      .catch(() => {
        this.failed({..._option, ..._crErr(ERR_LOAD, config.caption)})
      })
    }
  } else {
    this.failed({..._option, ..._crErr(ERR_FOUND, ERR_ITEM)})
  }
})

const _show = BA.showBrowserDynamic;
Object.assign(BA, {
  showNdl: _show.bind(null, BT_NDL),
  showEurostat: _show.bind(null, BT_EUROSTAT),
  showWatch: _show.bind(null, BT_WATCH_LIST)
})

export const BrowserActions = BA
