import Reflux from 'reflux-core';

import { bindTo } from '../storeApi';
import { showBrowser } from '../stores/browserStore';

import {
  BT_NDL,
  BT_EUROSTAT,
  BT_WATCH_LIST
} from '../../constants/BrowserType';

export const BAT_UPDATE_WATCH_BROWSER = 'updateWatchBrowser'

const BA = Reflux.createActions({
  [BAT_UPDATE_WATCH_BROWSER]: {}
});

Object.assign(BA, {
  showNdl: bindTo(showBrowser, BT_NDL),
  showEurostat: bindTo(showBrowser, BT_EUROSTAT),
  showWatch: bindTo(showBrowser, BT_WATCH_LIST)
})

export const BrowserActions = BA
