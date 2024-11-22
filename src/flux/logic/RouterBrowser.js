import { crRouter } from './LogicFn';

import {
  BT_NYSE_STOCKS,
  BT_NASDAQ_STOCKS,
  BT_WATCH_LIST
} from '../../constants/BrowserType';

import SourceBrowserDynamic from '../../components/browser-container/SourceBrowserDynamic';
import SourceBrowserDynamic2 from '../../components/browser-container/SourceBrowserDynamic2';

const RouterBrowser = crRouter({
  DEFAULT: SourceBrowserDynamic,

  [BT_NYSE_STOCKS]: SourceBrowserDynamic2,
  [BT_NASDAQ_STOCKS]: SourceBrowserDynamic2,

  get [BT_WATCH_LIST]() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development') {
      return import("js/components/watch-browser/WatchBrowser.js")
        .then(module => module.default)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "watch-browser" */
       /* webpackMode: "lazy" */
       "../../components/watch-browser/WatchBrowser"
     ).then(module => module.default)
  },

  get _BrowserSlider() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development') {
      return import("js/components/browser-slider/BrowserSlider.js")
        .then(module => module.default)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "browser-slider" */
       /* webpackMode: "lazy" */
       "../../components/browser-slider/BrowserSlider"
     ).then(module => module.default)
  },

  get STAT_ALL() {
    return this._BrowserSlider;
  }
});

export default RouterBrowser
