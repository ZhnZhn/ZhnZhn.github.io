import {
  BT_NYSE_STOCKS,
  BT_NASDAQ_STOCKS,
  BT_WATCH_LIST,
  BT_STAT_ALL
} from "../constants/BrowserType";

import { crGetRoute } from "../utils/crRouter";

import SourceBrowserDynamic from "../components/browser-container/SourceBrowserDynamic";
import SourceBrowserDynamic2 from "../components/browser-container/SourceBrowserDynamic2";

import {
  resolvePromise,
  throwErrOffline
} from "./asyncFn";

const _getModuleDefault = module => module.default;

const browserDynamic2 = resolvePromise(SourceBrowserDynamic2);
export const loadBrowserComp = crGetRoute({
  [BT_NYSE_STOCKS]: browserDynamic2,
  [BT_NASDAQ_STOCKS]: browserDynamic2,

  get [BT_WATCH_LIST]() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === "_development") {
      return import("js/components/watch-browser/WatchBrowser.js")
        .then(_getModuleDefault)
        .catch(throwErrOffline)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "watch-browser" */
       /* webpackMode: "lazy" */
       "../components/watch-browser/WatchBrowser"
     ).then(_getModuleDefault)
      .catch(throwErrOffline)
  },

  get _BrowserSlider() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === "_development") {
      return import("js/components/browser-slider/BrowserSlider.js")
        .then(_getModuleDefault)
        .catch(throwErrOffline)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "browser-slider" */
       /* webpackMode: "lazy" */
       "../components/browser-slider/BrowserSlider"
     ).then(_getModuleDefault)
      .catch(throwErrOffline)
  },

  get [BT_STAT_ALL]() {
    return this._BrowserSlider;
  }
}, resolvePromise(SourceBrowserDynamic))
