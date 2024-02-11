"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LogicFn = require("./LogicFn");
var _BrowserType = require("../../constants/BrowserType");
var _SourceBrowserDynamic = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic"));
var _SourceBrowserDynamic2 = _interopRequireDefault(require("../../components/browser-container/SourceBrowserDynamic2"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "watch-browser" */
    /* webpackMode: "lazy" */
    "../../components/watch-browser/WatchBrowser"))).then(module => module.default);
  },
  get _BrowserSlider() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/browser-slider/BrowserSlider.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "browser-slider" */
    /* webpackMode: "lazy" */
    "../../components/browser-slider/BrowserSlider"))).then(module => module.default);
  },
  get STAT_ALL() {
    return this._BrowserSlider;
  }
};
(0, _LogicFn.clearPrototypeOf)(RouterBrowser);
var _default = exports.default = RouterBrowser;
//# sourceMappingURL=RouterBrowser.js.map