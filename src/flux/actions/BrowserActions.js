import Reflux from 'reflux';

import Store from '../stores/ChartStore'
import Factory from '../logic/Factory'
import BrowserConfig from '../../constants/BrowserConfig'
import RouterModalDialog from '../../components/dialogs/RouterModalDialog'
import RouterDialog from '../logic/RouterDialog'

import { fetchJson } from '../../utils/fnFetch'
import { fnCatch } from '../logic/fnCatch';

export const BrowserActionTypes = {
  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',

  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};
const A = BrowserActionTypes;

const BrowserActions = Reflux.createActions({
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

BrowserActions[A.SHOW_BROWSER_DYNAMIC].listen(function(option={}){
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

BrowserActions[A.LOAD_BROWSER_DYNAMIC].listen(function(option){
  fetchJson({
    uri: option.sourceMenuUrl,
    option: option,
    onFetch: _fnFetchSourceMenu,
    onCompleted: this.completed,
    onCatch: fnCatch,
    onFailed: this.failed
  })
})


export default BrowserActions
