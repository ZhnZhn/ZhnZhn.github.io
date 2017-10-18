'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _DialogType = require('../../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

var _DialogType3 = require('../../components/dialogs/DialogType4');

var _DialogType4 = _interopRequireDefault(_DialogType3);

var _DialogType4A = require('../../components/dialogs/DialogType4A');

var _DialogType4A2 = _interopRequireDefault(_DialogType4A);

var _DialogType5 = require('../../components/dialogs/DialogType5');

var _DialogType6 = _interopRequireDefault(_DialogType5);

var _UNCommodityTradeDialog = require('../../components/quandl-browser/UNCommodityTradeDialog');

var _UNCommodityTradeDialog2 = _interopRequireDefault(_UNCommodityTradeDialog);

var _Futures3Dialog = require('../../components/quandl-browser/Futures3Dialog');

var _Futures3Dialog2 = _interopRequireDefault(_Futures3Dialog);

var _FuturesWikiDialog = require('../../components/quandl-browser/FuturesWikiDialog');

var _FuturesWikiDialog2 = _interopRequireDefault(_FuturesWikiDialog);

var _JodiWorldOilDialog = require('../../components/quandl-browser/JodiWorldOilDialog');

var _JodiWorldOilDialog2 = _interopRequireDefault(_JodiWorldOilDialog);

var _ZillowDialog = require('../../components/quandl-browser/ZillowDialog');

var _ZillowDialog2 = _interopRequireDefault(_ZillowDialog);

var _UnDialog = require('../../components/uncomtrade/UnDialog5');

var _UnDialog2 = _interopRequireDefault(_UnDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG_OFFLINE = 'It seems you are offline';

var _router = {
  DEFAULT: _DialogType2.default,

  DialogType3: _DialogType2.default,
  DialogType4: _DialogType4.default,
  DialogType4A: _DialogType4A2.default,
  DialogType5: _DialogType6.default,

  UNCommodityTradeDialog: _UNCommodityTradeDialog2.default,
  Futures3Dialog: _Futures3Dialog2.default,
  FuturesWikiDialog: _FuturesWikiDialog2.default,
  JodiWorldOilDialog: _JodiWorldOilDialog2.default,
  ZillowDialog: _ZillowDialog2.default,

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

  _loadAD: function _loadAD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      this.AD = System.import("js/components/stock-markets/AlphaDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    } else {
      this.AD = System.import(
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
    return this.AD.then(function (D) {
      return D.Indicator;
    });
  },
  get AlphaSectorDialog() {
    return this.AD.then(function (D) {
      return D.Sector;
    });
  },
  get AlphaIntradayDialog() {
    return this.AD.then(function (D) {
      return D.Intraday;
    });
  },

  _loadESD: function _loadESD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      this.ESD = System.import("js/components/eurostat/EurostatDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    } else {
      this.ESD = System.import(
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
    return this.ESD.then(function (D) {
      return D.Eurostat;
    });
  },
  get DialogEurostat2() {
    return this.ESD.then(function (D) {
      return D.Eurostat2;
    });
  },
  get DialogEurostat3() {
    return this.ESD.then(function (D) {
      return D.Eurostat3;
    });
  },

  loadDialogs: function loadDialogs(dialogsId) {
    switch (dialogsId) {
      case 'ALPHA':
        this._loadAD();break;
      case 'EUROSTAT':
        this._loadESD();break;
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
  loadDialogs: function loadDialogs(dialogsId) {
    _router.loadDialogs(dialogsId);
  }
};

exports.default = RouterDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\RouterDialog.js.map