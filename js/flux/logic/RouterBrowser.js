'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineEnumerableProperties2 = require('babel-runtime/helpers/defineEnumerableProperties');

var _defineEnumerableProperties3 = _interopRequireDefault(_defineEnumerableProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _BT$WATCH_LIST, _BrowserSlider, _STAT_ALL, _RouterBrowser, _mutatorMap;

var _Type = require('../../constants/Type');

var _SourceBrowserDynamic = require('../../components/browser-container/SourceBrowserDynamic');

var _SourceBrowserDynamic2 = _interopRequireDefault(_SourceBrowserDynamic);

var _SourceBrowserDynamic3 = require('../../components/browser-container/SourceBrowserDynamic2');

var _SourceBrowserDynamic4 = _interopRequireDefault(_SourceBrowserDynamic3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterBrowser = (_RouterBrowser = {
  DEFAULT: _SourceBrowserDynamic2.default

}, (0, _defineProperty3.default)(_RouterBrowser, _Type.BrowserType.US_STOCKS, _SourceBrowserDynamic4.default), (0, _defineProperty3.default)(_RouterBrowser, _Type.BrowserType.NYSE_STOCKS, _SourceBrowserDynamic4.default), (0, _defineProperty3.default)(_RouterBrowser, _Type.BrowserType.NASDAQ_STOCKS, _SourceBrowserDynamic4.default), (0, _defineProperty3.default)(_RouterBrowser, _Type.BrowserType.LONDON_STOCKS, _SourceBrowserDynamic4.default), _BT$WATCH_LIST = _Type.BrowserType.WATCH_LIST, _mutatorMap = {}, _mutatorMap[_BT$WATCH_LIST] = _mutatorMap[_BT$WATCH_LIST] || {}, _mutatorMap[_BT$WATCH_LIST].get = function () {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
    return System.import("js/components/watch-browser/WatchBrowser.js").then(function (module) {
      return module.default;
    });
  }
  /*eslint-enable no-undef */
  return System.import(
  /* webpackChunkName: "watch-browser" */
  /* webpackMode: "lazy" */
  "../../components/watch-browser/WatchBrowser").then(function (module) {
    return module.default;
  });
}, _BrowserSlider = '_BrowserSlider', _mutatorMap[_BrowserSlider] = _mutatorMap[_BrowserSlider] || {}, _mutatorMap[_BrowserSlider].get = function () {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
    return System.import("js/components/browser-slider/BrowserSlider.js").then(function (module) {
      return module.default;
    });
  }
  /*eslint-enable no-undef */
  return System.import(
  /* webpackChunkName: "browser-slider" */
  /* webpackMode: "lazy" */
  "../../components/browser-slider/BrowserSlider").then(function (module) {
    return module.default;
  });
}, _STAT_ALL = 'STAT_ALL', _mutatorMap[_STAT_ALL] = _mutatorMap[_STAT_ALL] || {}, _mutatorMap[_STAT_ALL].get = function () {
  return this._BrowserSlider;
}, (0, _defineEnumerableProperties3.default)(_RouterBrowser, _mutatorMap), _RouterBrowser);

exports.default = RouterBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\RouterBrowser.js.map