"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadDialogs = exports.getDialog = void 0;
var _BrowserType = require("../constants/BrowserType");
var _LoadType = require("../constants/LoadType");
var _isTypeFn = require("../utils/isTypeFn");
var _crRouter = require("../utils/crRouter");
var _DialogSelectN = _interopRequireDefault(require("../components/dialogs/DialogSelectN"));
var _LoadImpl = require("../flux/logic/LoadImpl");
var _asyncFn = require("./asyncFn");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const _resolveDialogs = (module, loadType, router) => {
  const df = module.default;
  (0, _LoadImpl.addLoadImpl)(loadType, df._a);
  return router[loadType] = (0, _asyncFn.resolvePromise)(df);
};
const _promiseDialogSelectN = Promise.resolve(_DialogSelectN.default);
const _router = (0, _crRouter.crRouter)({
  DF: _promiseDialogSelectN,
  DialogSelectN: _promiseDialogSelectN,
  _loadD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/dialogs/Dialogs.js"))).then(module => this.D = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "dialogs" */
    /* webpackMode: "lazy" */
    "../components/dialogs/Dialogs"))).then(module => this.D = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
  },
  getD() {
    return this.D || this._loadD();
  },
  get DialogQuery() {
    return this.getD().then(D => D.Query);
  },
  _loadUN() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/uncomtrade/UnDialogs.js"))).then(module => _resolveDialogs(module, _LoadType.LT_UN, this)).catch(_asyncFn.throwErrOffline);
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "un-dialogs" */
    /* webpackMode: "lazy" */
    "../components/uncomtrade/UnDialogs"))).then(module => _resolveDialogs(module, _LoadType.LT_UN, this)).catch(_asyncFn.throwErrOffline);
  },
  getUN() {
    return this[_LoadType.LT_UN] || this._loadUN();
  },
  get UnDialog5() {
    return this.getUN().then(D => D.UnDialog5);
  },
  get UnDialogAgg() {
    return this.getUN().then(D => D.UnDialogAgg);
  },
  _loadSM() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stock-markets/AvDialogs.js"))).then(module => _resolveDialogs(module, _LoadType.LT_AV, this)).catch(_asyncFn.throwErrOffline);
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "av-dialogs" */
    /* webpackMode: "lazy" */
    "../components/stock-markets/AvDialogs"))).then(module => _resolveDialogs(module, _LoadType.LT_AV, this)).catch(_asyncFn.throwErrOffline);
  },
  getSM() {
    return this[_LoadType.LT_AV] || this._loadSM();
  },
  get AlphaIndicatorDialog() {
    return this.getSM().then(D => D.Indicator);
  },
  get AlphaTopDialog() {
    return this.getSM().then(D => D.Top);
  },
  get AlphaSearchDialog() {
    return this.getSM().then(D => D.Search);
  },
  _loadSD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stat-dialogs/StatDialogs.js"))).then(module => this.SD = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "stat-dialogs" */
    /* webpackMode: "lazy" */
    "../components/stat-dialogs/StatDialogs"))).then(module => this.SD = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
  },
  getSD() {
    return this.SD || this._loadSD();
  },
  get DialogStatN() {
    return this.getSD().then(D => D.StatN);
  },
  _loadUS() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === "_development") {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/us-economics/UsDialogs.js"))).then(module => this.US = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "us-economics-dialogs" */
    /* webpackMode: "lazy" */
    "../components/us-economics/UsDialogs"))).then(module => this.US = (0, _asyncFn.resolvePromise)(module.default)).catch(_asyncFn.throwErrOffline);
  },
  getUS() {
    return this.US || this._loadUS();
  },
  get ZillowDialog() {
    return this.getUS().then(D => D.Zillow);
  },
  loadDialogs(browserType) {
    switch (browserType) {
      case _BrowserType.BT_NORWAY_STATISTICS:
      case _BrowserType.BT_SWEDEN_STAT:
        this._loadSD();
        break;
      case _BrowserType.BT_UN_COMTRADE:
        this._loadUN();
        break;
      default:
        return;
    }
  }
});
const getDialog = type => (0, _isTypeFn.isStr)(type) ? _router[type] : _router.DF;
exports.getDialog = getDialog;
const loadDialogs = browserType => {
  _router.loadDialogs(browserType);
};
exports.loadDialogs = loadDialogs;
//# sourceMappingURL=loadDialog.js.map