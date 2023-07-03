"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadDialogs = exports.getDialog = void 0;
var _BrowserType = require("../../constants/BrowserType");
var _Dialogs = _interopRequireDefault(require("../../components/dialogs/Dialogs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);
const _router = {
  DF: _Dialogs.default.Type3,
  DialogSelectN: _Dialogs.default.SelectN,
  DialogType3: _Dialogs.default.Type3,
  _loadGD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/dialogs/GeneralDialogs.js"))).then(module => this.GD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "general-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/dialogs/GeneralDialogs"))).then(module => this.GD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },
  getGD() {
    return this.GD || this._loadGD();
  },
  get DialogQuery() {
    return this.getGD().then(D => D.Query);
  },
  get DialogType4() {
    return this.getGD().then(D => D.Type4);
  },
  get DialogType4A() {
    return this.getGD().then(D => D.Type4A);
  },
  get DialogType5() {
    return this.getGD().then(D => D.Type5);
  },
  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/chart-config/ChartConfigDialog.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "config-dialog" */
    /* webpackMode: "lazy" */
    "../../components/chart-config/ChartConfigDialog"))).then(module => module.default);
  },
  _loadUN() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      //
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/uncomtrade/UnDialogs.js"))).then(module => this.UN = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "un-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/uncomtrade/UnDialogs"))).then(module => this.UN = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },
  getUN() {
    return this.UN || this._loadUN();
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
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stock-markets/AlphaDialogs.js"))).then(module => this.SM = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "av-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/stock-markets/AlphaDialogs"))).then(module => this.SM = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },
  getSM() {
    return this.SM || this._loadSM();
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
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/stat-dialogs/StatDialogs.js"))).then(module => this.SD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "stat-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/stat-dialogs/StatDialogs"))).then(module => this.SD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
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
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/us-economics/UsDialogs.js"))).then(module => this.US = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "us-economics-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/us-economics/UsDialogs"))).then(module => this.US = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },
  getUS() {
    return this.US || this._loadUS();
  },
  get ZillowDialog() {
    return this.getUS().then(D => D.Zillow);
  },
  _loadNDL() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/ndl/NdlDialogs.js"))).then(module => this.NDL = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ndl-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/ndl/NdlDialogs"))).then(module => this.NDL = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },
  getNDL() {
    return this.NDL || this._loadNDL();
  },
  get UNCommodityTradeDialog() {
    return this.getNDL().then(D => D.UNCommodityTrade);
  },
  get Futures3Dialog() {
    return this.getNDL().then(D => D.Futures3);
  },
  get FuturesWikiDialog() {
    return this.getNDL().then(D => D.FuturesWiki);
  },
  get JodiWorldOilDialog() {
    return this.getNDL().then(D => D.JodiWorldOil);
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
      case _BrowserType.BT_NDL:
        this._loadNDL();
        break;
      case _BrowserType.BT_UN_COMTRADE:
        this._loadUN();
        break;
      default:
        return;
    }
  }
};
const getDialog = type => _resolve(type && _router[type] || _router.DF);
exports.getDialog = getDialog;
const loadDialogs = browserType => {
  _router.loadDialogs(browserType);
};
exports.loadDialogs = loadDialogs;
//# sourceMappingURL=RouterDialog.js.map