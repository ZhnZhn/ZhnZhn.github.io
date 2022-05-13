"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _BrowserType = require("../../constants/BrowserType");

var _SourceBrowserDynamic = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic"));

var _SourceBrowserDynamic2 = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic2"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RouterBrowser = {
  DEFAULT: _SourceBrowserDynamic.default,
  [_BrowserType.BT_NYSE_STOCKS]: _SourceBrowserDynamic2.default,
  [_BrowserType.BT_NASDAQ_STOCKS]: _SourceBrowserDynamic2.default,

  get [_BrowserType.BT_WATCH_LIST]() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/watch-browser/WatchBrowser.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */


    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/watch-browser/WatchBrowser"))).then(module => module.default);
  },

  get _BrowserSlider() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/browser-slider/BrowserSlider.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */


    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/browser-slider/BrowserSlider"))).then(module => module.default);
  },

  get STAT_ALL() {
    return this._BrowserSlider;
  }

};
var _default = RouterBrowser;
exports.default = _default;
//# sourceMappingURL=RouterBrowser.js.map