'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _Type = require('../../constants/Type');

var _Dialogs = require('../../components/dialogs/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Dialogs3 = require('../../components/quandl-browser/Dialogs');

var _Dialogs4 = _interopRequireDefault(_Dialogs3);

var _UnDialog = require('../../components/uncomtrade/UnDialog5');

var _UnDialog2 = _interopRequireDefault(_UnDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG_OFFLINE = 'It seems you are offline';

var _router = {
  DEFAULT: _Dialogs2.default.Type3,

  DialogType3: _Dialogs2.default.Type3,
  DialogType4: _Dialogs2.default.Type4,
  DialogType4A: _Dialogs2.default.Type4A,
  DialogType5: _Dialogs2.default.Type5,

  UNCommodityTradeDialog: _Dialogs4.default.UNCommodityTrade,
  Futures3Dialog: _Dialogs4.default.Futures3,
  FuturesWikiDialog: _Dialogs4.default.FuturesWiki,
  JodiWorldOilDialog: _Dialogs4.default.JodiWorldOil,
  ZillowDialog: _Dialogs4.default.Zillow,

  UnDialog5: _UnDialog2.default,

  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return System.import("js/components/chart-config/ChartConfigDialog.js").then(function (module) {
        return module.default;
      });
    }
    /*eslint-enable no-undef */
    return System.import(
    /* webpackChunkName: "config-dialog" */
    /* webpackMode: "lazy" */
    "../../components/chart-config/ChartConfigDialog").then(function (module) {
      return module.default;
    });
  },

  _loadSM: function _loadSM() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      this.SM = System.import("js/components/stock-markets/AlphaDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    } else {
      this.SM = System.import(
      /* webpackChunkName: "alpha-dialogs" */
      /* webpackMode: "lazy" */
      "../../components/stock-markets/AlphaDialogs").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
    }
  },

  get AlphaIndicatorDialog() {
    return this.SM.then(function (D) {
      return D.Indicator;
    });
  },
  get AlphaSectorDialog() {
    return this.SM.then(function (D) {
      return D.Sector;
    });
  },
  get AlphaIntradayDialog() {
    return this.SM.then(function (D) {
      return D.Intraday;
    });
  },

  _loadES: function _loadES() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return this.ES = System.import("js/components/eurostat/EurostatDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    } else {
      return this.ES = System.import(
      /* webpackChunkName: "eurostat-dialogs" */
      /* webpackMode: "lazy" */
      "../../components/eurostat/EurostatDialogs").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
    }
  },

  get DialogEurostat() {
    return this.ES.then(function (D) {
      return D.Eurostat;
    });
  },
  get DialogEurostat2() {
    return this.ES.then(function (D) {
      return D.Eurostat2;
    });
  },
  get DialogEurostat3() {
    return this.ES.then(function (D) {
      return D.Eurostat3;
    });
  },
  get DialogEurostat3A() {
    return this.ES.then(function (D) {
      return D.Eurostat3A;
    });
  },
  get DialogStatN() {
    var ES = this.ES || this._loadES();
    return ES.then(function (D) {
      return D.StatN;
    });
  },

  loadDialogs: function loadDialogs(browserType) {
    switch (browserType) {
      case _Type.BrowserType.STOCK_MARKETS:
        this._loadSM();break;
      case _Type.BrowserType.EUROSTAT:
      case _Type.BrowserType.NORWAY_STATISTICS:
      case _Type.BrowserType.SWEDEN_STAT:
        this._loadES();break;
      default:
        return undefined;
    }
  }
};

var RouterDialog = {
  getDialog: function getDialog(type) {
    if (type && (0, _typeof3.default)(_router[type]) !== undefined) {
      return Promise.resolve(_router[type]);
    } else {
      return Promise.resolve(_router['DEFAULT']);
    }
  },
  loadDialogs: function loadDialogs(browserType) {
    _router.loadDialogs(browserType);
  }
};

exports.default = RouterDialog;
//# sourceMappingURL=RouterDialog.js.map