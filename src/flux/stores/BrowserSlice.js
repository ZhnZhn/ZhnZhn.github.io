import {
  BAT_SHOW_BROWSER_DYNAMIC,
  BAT_INIT_BROWSER_DYNAMIC
} from '../actions/BrowserActions';

import { showAlertDialog } from './compStore';

import {
  getBrowserMenu,
  setBrowserMenu
} from './browserLogic';

const FAILED = 'Failed';

const BrowserSlice = {
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
  }
}

export default BrowserSlice
