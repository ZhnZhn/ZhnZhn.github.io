import Reflux from 'reflux';

import RouterModalDialog from '../../components/dialogs/RouterModalDialog'
import RouterDialog from '../logic/RouterDialog'

import { fetchJson } from '../../utils/fnFetch'
import { fnCatch } from '../logic/fnCatch';

export const BrowserActionTypes = {
  SHOW_BROWSER: 'showBrowser',
  UPDATE_BROWSER_MENU: 'updateBrowserMenu',

  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',
  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
}
const A = BrowserActionTypes;

const BrowserActions = Reflux.createActions({
  [A.SHOW_BROWSER] : {},
  [A.UPDATE_BROWSER_MENU] : {},

  [A.SHOW_BROWSER_DYNAMIC] : {},
  [A.INIT_BROWSER_DYNAMIC] : {},
  [A.LOAD_BROWSER_DYNAMIC] : { children : ['completed', 'failed']},

  [A.UPDATE_WATCH_BROWSER] : {}
});

const _fnFetchSourceMenu = function({ json, option, onCompleted }){
  const { browserType } = option;
  onCompleted({ json, browserType });
}

BrowserActions[A.SHOW_BROWSER_DYNAMIC].listen(function(option){
  const { browserType } = option
  RouterModalDialog.loadDialogs(browserType)
  RouterDialog.loadDialogs(browserType)
})

BrowserActions[A.LOAD_BROWSER_DYNAMIC].listen(function(option){
   const { sourceMenuUrl } = option;
   //RouterDialog.loadDialogs(dialogsId)
   fetchJson({
     uri: sourceMenuUrl,
     option: option,
     onFetch: _fnFetchSourceMenu,
     onCompleted: this.completed,
     onCatch: fnCatch,
     onFailed: this.failed
   })
})


export default BrowserActions
