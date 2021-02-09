import Reflux from 'reflux-core';

import Store from '../stores/ChartStore'
import Factory from '../logic/Factory'
import BrowserConfig from '../../constants/BrowserConfig'
import { BrowserType as BT } from '../../constants/Type'
import RouterModalDialog from '../../components/dialogs/RouterModalDialog'
import RouterDialog from '../logic/RouterDialog'

import { fetchJson } from '../../utils/fnFetch'
import onCatch from '../logic/onCatch'

export const BrowserActionTypes = {
  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',

  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',
  LOAD_BROWSER_FAILED: 'loadBrowserFailed',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};
const A = BrowserActionTypes;

const BA = Reflux.createActions({
  [A.SHOW_BROWSER_DYNAMIC]: {
    children: ['done', 'init', 'failed']
  },
  [A.INIT_BROWSER_DYNAMIC] : {},
  [A.LOAD_BROWSER_DYNAMIC] : {
    children : ['completed', 'failed']
  },

  [A.UPDATE_WATCH_BROWSER] : {}
});

const _fnFetchSourceMenu = function({ json, option, onCompleted }){
  const { browserType } = option;
  onCompleted({ json, browserType });
}
const ERR = {
  LOAD: "Failed to load browser.",
  FOUND: "Browser hasn't found.",
  ITEM: "Browser"
};
const _crErr = (alertDescr, alertItemId) => ({
  alertDescr, alertItemId
});

BA[A.SHOW_BROWSER_DYNAMIC].listen(function(option={}){
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
      .then(() => Factory.crAsyncBrowser(config))
      .then(elBrowser => {
        this.init(elBrowser, config)
      })
      .catch(() => {
        this.failed({..._option, ..._crErr(ERR.LOAD, config.caption)})
      })
    }
  } else {
    this.failed({..._option, ..._crErr(ERR.FOUND, ERR.ITEM)})
  }
})

BA[A.LOAD_BROWSER_DYNAMIC].listen(function(option){
  fetchJson({
    uri: option.sourceMenuUrl,
    option: option,
    onFetch: _fnFetchSourceMenu,
    onCompleted: this.completed,
    onCatch: onCatch,
    onFailed: this.failed
  })
})

const _show = BA.showBrowserDynamic;
BA.showQuandl = _show.bind(null, BT.QUANDL)
BA.showEurostat = _show.bind(null, BT.EUROSTAT)
BA.showWatch = _show.bind(null, BT.WATCH_LIST)


export default BA
