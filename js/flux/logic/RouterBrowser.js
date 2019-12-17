"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _defineEnumerableProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/defineEnumerableProperties"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _Type = require("../../constants/Type");

var _SourceBrowserDynamic = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic"));

var _SourceBrowserDynamic2 = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic2"));

var _BT$WATCH_LIST, _BrowserSlider, _STAT_ALL, _RouterBrowser, _mutatorMap;

var RouterBrowser = (_RouterBrowser = {
  DEFAULT: _SourceBrowserDynamic["default"]
}, _RouterBrowser[_Type.BrowserType.US_STOCKS] = _SourceBrowserDynamic2["default"], _RouterBrowser[_Type.BrowserType.NYSE_STOCKS] = _SourceBrowserDynamic2["default"], _RouterBrowser[_Type.BrowserType.NASDAQ_STOCKS] = _SourceBrowserDynamic2["default"], _RouterBrowser[_Type.BrowserType.LONDON_STOCKS] = _SourceBrowserDynamic2["default"], _BT$WATCH_LIST = _Type.BrowserType.WATCH_LIST, _mutatorMap = {}, _mutatorMap[_BT$WATCH_LIST] = _mutatorMap[_BT$WATCH_LIST] || {}, _mutatorMap[_BT$WATCH_LIST].get = function () {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("js/components/watch-browser/WatchBrowser.js"));
    }).then(function (module) {
      return module["default"];
    });
  }
  /*eslint-enable no-undef */


  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2["default"])(require("../../components/watch-browser/WatchBrowser"));
  }).then(function (module) {
    return module["default"];
  });
}, _BrowserSlider = "_BrowserSlider", _mutatorMap[_BrowserSlider] = _mutatorMap[_BrowserSlider] || {}, _mutatorMap[_BrowserSlider].get = function () {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("js/components/browser-slider/BrowserSlider.js"));
    }).then(function (module) {
      return module["default"];
    });
  }
  /*eslint-enable no-undef */


  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2["default"])(require("../../components/browser-slider/BrowserSlider"));
  }).then(function (module) {
    return module["default"];
  });
}, _STAT_ALL = "STAT_ALL", _mutatorMap[_STAT_ALL] = _mutatorMap[_STAT_ALL] || {}, _mutatorMap[_STAT_ALL].get = function () {
  return this._BrowserSlider;
}, (0, _defineEnumerableProperties2["default"])(_RouterBrowser, _mutatorMap), _RouterBrowser);
var _default = RouterBrowser;
exports["default"] = _default;
//# sourceMappingURL=RouterBrowser.js.map