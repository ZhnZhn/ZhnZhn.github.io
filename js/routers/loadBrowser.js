"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadBrowserComp = void 0;
var _BrowserType = require("../constants/BrowserType");
var _crRouter = require("../utils/crRouter");
var _SourceBrowserDynamic = _interopRequireDefault(require("../components/browser-container/SourceBrowserDynamic"));
var _SourceBrowserDynamic2 = _interopRequireDefault(require("../components/browser-container/SourceBrowserDynamic2"));
var _asyncFn = require("./asyncFn");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const _getModuleDefault = module => module.default;
const browserDynamic2 = (0, _asyncFn.resolvePromise)(_SourceBrowserDynamic2.default);
const loadBrowserComp = exports.loadBrowserComp = (0, _crRouter.crGetRoute)({
  [_BrowserType.BT_NYSE_STOCKS]: browserDynamic2,
  [_BrowserType.BT_NASDAQ_STOCKS]: browserDynamic2,
  get [_BrowserType.BT_WATCH_LIST]() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/watch-browser/WatchBrowser.js"))).then(_getModuleDefault).catch(_asyncFn.throwErrOffline);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "watch-browser" */
    /* webpackMode: "lazy" */
    "../components/watch-browser/WatchBrowser"))).then(_getModuleDefault).catch(_asyncFn.throwErrOffline);
  },
  get _BrowserSlider() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/browser-slider/BrowserSlider.js"))).then(_getModuleDefault).catch(_asyncFn.throwErrOffline);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "browser-slider" */
    /* webpackMode: "lazy" */
    "../components/browser-slider/BrowserSlider"))).then(_getModuleDefault).catch(_asyncFn.throwErrOffline);
  },
  get [_BrowserType.BT_STAT_ALL]() {
    return this._BrowserSlider;
  }
}, (0, _asyncFn.resolvePromise)(_SourceBrowserDynamic.default));
//# sourceMappingURL=loadBrowser.js.map