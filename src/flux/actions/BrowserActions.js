import Reflux from 'reflux-core';

import Store from '../stores/ChartStore';
import { crAsyncBrowser } from '../logic/Factory';
import BrowserConfig from '../../constants/BrowserConfig';
import {
  BT_QUANDL,
  BT_EUROSTAT,
  BT_WATCH_LIST
} from '../../constants/BrowserType';
import RouterModalDialog from '../../components/dialogs/RouterModalDialog';
import RouterDialog from '../logic/RouterDialog';

import { fetchJson } from '../../utils/fnFetch';
import onCatch from '../logic/onCatch';

export const BAT_SHOW_BROWSER_DYNAMIC = 'showBrowserDynamic'
export const BAT_INIT_BROWSER_DYNAMIC = 'initBrowserDynamic'
export const BAT_LOAD_BROWSER_DYNAMIC = 'loadBrowserDynamic'
export const BAT_LOAD_BROWSER_DYNAMIC_COMPLETED = 'loadBrowserDynamicCompleted'
export const BAT_LOAD_BROWSER_FAILED = 'loadBrowserFailed'
export const BAT_UPDATE_WATCH_BROWSER = 'updateWatchBrowser'
export const BAT_UPDATE_BROWSER_MENU = 'updateBrowserMenu'

const BA = Reflux.createActions({
  [BAT_SHOW_BROWSER_DYNAMIC]: {
    children: ['done', 'init', 'failed']
  },
  [BAT_INIT_BROWSER_DYNAMIC]: {},
  [BAT_LOAD_BROWSER_DYNAMIC]: {
    children: ['completed', 'failed']
  },

  [BAT_UPDATE_WATCH_BROWSER]: {}
});

const ERR_LOAD = "Failed to load browser."
, ERR_FOUND = "Browser hasn't found."
, ERR_ITEM = "Browser"
, _fetchSourceMenu = ({
  json,
  option,
  onCompleted
}) => {
  const { browserType } = option;
  onCompleted({ json, browserType });
};

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
    if (Store.getBrowserMenu(bT)) {
      this.done(_option)
    } else {
      Promise.all([
        RouterModalDialog.loadDialogs(bT),
        RouterDialog.loadDialogs(bT)
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

BA[BAT_LOAD_BROWSER_DYNAMIC].listen(function(option){
  fetchJson({
    option,
    uri: option.sourceMenuUrl,
    onFetch: _fetchSourceMenu,
    onCompleted: this.completed,
    onFailed: this.failed,
    onCatch
  })
})

const _show = BA.showBrowserDynamic;
Object.assign(BA, {
  showQuandl: _show.bind(null, BT_QUANDL),
  showEurostat: _show.bind(null, BT_EUROSTAT),
  showWatch: _show.bind(null, BT_WATCH_LIST)
})

export const BrowserActions = BA
