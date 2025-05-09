"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadDialogs = exports.getDialog = void 0;
var _crRouter = require("../../utils/crRouter");
var _BrowserType = require("../../constants/BrowserType");
var _LoadType = require("../../constants/LoadType");
var _Msg = require("../../constants/Msg");
var _DialogSelectN = _interopRequireDefault(require("../../components/dialogs/DialogSelectN"));
var _LoadImpl = require("./LoadImpl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const _resolve = Promise.resolve.bind(Promise);
const _resolveDialogs = (df, loadType, router) => {
  (0, _LoadImpl.addLoadImpl)(loadType, df._a);
  return router[loadType] = _resolve(df);
};
const _router = (0, _crRouter.crRouter)({
  DF: _DialogSelectN.default,
  DialogSelectN: _DialogSelectN.default,
  _loadD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/dialogs/Dialogs.js"))).then(module => this.D = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "dialogs" */
    /* webpackMode: "lazy" */
    "../../components/dialogs/Dialogs"))).then(module => this.D = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
  },
  getD() {
    return this.D || this._loadD();
  },
  get DialogQuery() {
    return this.getD().then(D => D.Query);
  },
  _loadUN() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/uncomtrade/UnDialogs.js"))).then(_ref => {
        let {
          default: df
        } = _ref;
        return _resolveDialogs(df, _LoadType.LT_UN, this);
      }).catch(err => console.log(_Msg.MSG_OFFLINE));
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "un-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/uncomtrade/UnDialogs"))).then(_ref2 => {
      let {
        default: df
      } = _ref2;
      return _resolveDialogs(df, _LoadType.LT_UN, this);
    }).catch(err => console.log(_Msg.MSG_OFFLINE));
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
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stock-markets/AvDialogs.js"))).then(_ref3 => {
        let {
          default: df
        } = _ref3;
        return _resolveDialogs(df, _LoadType.LT_AV, this);
      }).catch(err => console.log(_Msg.MSG_OFFLINE));
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "av-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/stock-markets/AvDialogs"))).then(_ref4 => {
      let {
        default: df
      } = _ref4;
      return _resolveDialogs(df, _LoadType.LT_AV, this);
    }).catch(err => console.log(_Msg.MSG_OFFLINE));
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
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stat-dialogs/StatDialogs.js"))).then(module => this.SD = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "stat-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/stat-dialogs/StatDialogs"))).then(module => this.SD = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
  },
  getSD() {
    return this.SD || this._loadSD();
  },
  get DialogStatN() {
    return this.getSD().then(D => D.StatN);
  },
  _loadUS() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/us-economics/UsDialogs.js"))).then(module => this.US = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
      /*eslint-enable no-undef */
    }
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "us-economics-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/us-economics/UsDialogs"))).then(module => this.US = _resolve(module.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
  },
  getUS() {
    return this.US || this._loadUS();
  },
  get ZillowDialog() {
    return this.getUS().then(D => D.Zillow);
  },
  loadDialogs(browserType) {
    switch (browserType) {
      case _BrowserType.BT_STOCK_MARKETS:
        this._loadSM();
        break;
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
const getDialog = type => _resolve(type && _router[type] || _router.DF);
exports.getDialog = getDialog;
const loadDialogs = browserType => {
  _router.loadDialogs(browserType);
};
exports.loadDialogs = loadDialogs;
//# sourceMappingURL=RouterDialog.js.map