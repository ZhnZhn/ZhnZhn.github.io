import Reflux from 'reflux';

import RouterDialog from '../logic/RouterDialog'

import { fetchJson } from '../../utils/fnFetch'
import { fnCatch } from '../logic/fnCatch';

export const BrowserActionTypes = {
  SHOW_BROWSER : 'showBrowser',
  UPDATE_BROWSER_MENU : 'updateBrowserMenu',

  SHOW_BROWSER_DYNAMIC : 'showBrowserDynamic',
  INIT_BROWSER_DYNAMIC : 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC : 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED : 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER : 'updateWatchBrowser'
}

const BrowserActions = Reflux.createActions({
  [BrowserActionTypes.SHOW_BROWSER] : {},
  [BrowserActionTypes.UPDATE_BROWSER_MENU] : {},

  [BrowserActionTypes.SHOW_BROWSER_DYNAMIC] : {},
  [BrowserActionTypes.INIT_BROWSER_DYNAMIC] : {},
  [BrowserActionTypes.LOAD_BROWSER_DYNAMIC] : { children : ['completed', 'failed']},

  [BrowserActionTypes.UPDATE_WATCH_BROWSER] : {}
});

const _fnFetchSourceMenu = function({ json, option, onCompleted }){
  const { browserType } = option;
  onCompleted({ json, browserType });
}

BrowserActions[BrowserActionTypes.LOAD_BROWSER_DYNAMIC].listen(function(option){

   RouterDialog.loadDialogs(option.dialogsId)
   fetchJson({
     uri : option.sourceMenuUrl,
     option : option,
     onFetch : _fnFetchSourceMenu,
     onCompleted : this.completed,
     onCatch : fnCatch,
     onFailed : this.failed
   })
})


export default BrowserActions
