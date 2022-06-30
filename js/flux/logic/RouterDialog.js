"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

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
      return this.GD = Promise.resolve().then(() => _interopRequireWildcard(require("js/components/dialogs/GeneralDialogs.js"))).then(module => this.GD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/dialogs/GeneralDialogs"))).then(module => this.GD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
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


    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/chart-config/ChartConfigDialog"))).then(module => module.default);
  },

  _loadUN() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return this.UN = Promise.resolve().then(() => _interopRequireWildcard(require("js/components/uncomtrade/UnDialogs.js"))).then(module => this.UN = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/uncomtrade/UnDialogs"))).then(module => this.UN = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
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

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/stock-markets/AlphaDialogs"))).then(module => this.SM = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },

  getSM() {
    return this.SM || this._loadSM();
  },

  get AlphaIndicatorDialog() {
    return this.getSM().then(D => D.Indicator);
  },

  get AlphaSectorDialog() {
    return this.getSM().then(D => D.Sector);
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

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/stat-dialogs/StatDialogs"))).then(module => this.SD = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },

  getSD() {
    return this.SD || this._loadSD();
  },

  get DialogStatN() {
    return this.getSD().then(D => D.StatN);
  },

  _loadUSAE() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/usa-economy/UsaeDialogs.js"))).then(module => this.USAE = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/usa-economy/UsaeDialogs"))).then(module => this.USAE = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },

  getUSAE() {
    return this.USAE || this._loadUSAE();
  },

  get ZillowDialog() {
    return this.getUSAE().then(D => D.Zillow);
  },

  _loadQE() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/quandl/QuandlDialogs.js"))).then(module => this.QE = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(() => _interopRequireWildcard(require("../../components/quandl/QuandlDialogs"))).then(module => this.QE = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
  },

  getQE() {
    return this.QE || this._loadQE();
  },

  get UNCommodityTradeDialog() {
    return this.getQE().then(D => D.UNCommodityTrade);
  },

  get Futures3Dialog() {
    return this.getQE().then(D => D.Futures3);
  },

  get FuturesWikiDialog() {
    return this.getQE().then(D => D.FuturesWiki);
  },

  get JodiWorldOilDialog() {
    return this.getQE().then(D => D.JodiWorldOil);
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

      case _BrowserType.BT_QUANDL:
        this._loadQE();

        break;

      case _BrowserType.BT_UN_COMTRADE:
        this._loadUN();

        break;

      default:
        return;
    }
  }

};
const RouterDialog = {
  getDialog(type) {
    return Promise.resolve(type && _router[type] || _router.DF);
  },

  loadDialogs(browserType) {
    _router.loadDialogs(browserType);
  }

};
var _default = RouterDialog;
exports.default = _default;
//# sourceMappingURL=RouterDialog.js.map