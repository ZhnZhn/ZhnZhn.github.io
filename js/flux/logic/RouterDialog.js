'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _Type = require('../../constants/Type');

var _Dialogs = require('../../components/dialogs/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG_OFFLINE = 'It seems you are offline';

var _router = {
  DEFAULT: _Dialogs2.default.Type3,

  DialogType3: _Dialogs2.default.Type3,
  DialogType4: _Dialogs2.default.Type4,
  DialogType4A: _Dialogs2.default.Type4A,
  DialogType5: _Dialogs2.default.Type5,
  DialogQuery: _Dialogs2.default.Query,

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

  _loadUN: function _loadUN() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return this.UN = System.import("js/components/uncomtrade/UnDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }
    return this.UN = System.import(
    /* webpackChunkName: "un-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/uncomtrade/UnDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
  },


  get UnDialog5() {
    return this.UN.then(function (D) {
      return D.UnDialog5;
    });
  },

  _loadSM: function _loadSM() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return this.SM = System.import("js/components/stock-markets/AlphaDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }
    return this.SM = System.import(
    /* webpackChunkName: "alpha-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/stock-markets/AlphaDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
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
  get AlphaSearchDialog() {
    return this.SM.then(function (D) {
      return D.Search;
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
    }
    return this.ES = System.import(
    /* webpackChunkName: "eurostat-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/eurostat/EurostatDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getES: function getES() {
    return this.ES || this._loadES();
  },

  get DialogEurostat() {
    return this.getES().then(function (D) {
      return D.Eurostat;
    });
  },
  get DialogEurostat2() {
    return this.getES().then(function (D) {
      return D.Eurostat2;
    });
  },
  get DialogEurostat3A() {
    return this.getES().then(function (D) {
      return D.Eurostat3A;
    });
  },
  get DialogSelectN() {
    return this.getES().then(function (D) {
      return D.SelectN;
    });
  },
  get DialogStatN() {
    return this.getES().then(function (D) {
      return D.StatN;
    });
  },

  _loadUSAE: function _loadUSAE() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return this.USAE = System.import("js/components/usa-economy/UsaeDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }
    return this.USAE = System.import(
    /* webpackChunkName: "usa-economy-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/usa-economy/UsaeDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
  },


  get ZillowDialog() {
    var _USAE = this.USAE || this._loadUSAE();
    return _USAE.then(function (D) {
      return D.Zillow;
    });
  },

  _loadQE: function _loadQE() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === 'development') {
      return this.QE = System.import("js/components/quandl/QuandlDialogs.js").then(function (module) {
        return module.default;
      }).catch(function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }
    return this.QE = System.import(
    /* webpackChunkName: "quandl-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/quandl/QuandlDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
  },


  get UNCommodityTradeDialog() {
    return this.QE.then(function (D) {
      return D.UNCommodityTrade;
    });
  },
  get Futures3Dialog() {
    return this.QE.then(function (D) {
      return D.Futures3;
    });
  },
  get FuturesWikiDialog() {
    return this.QE.then(function (D) {
      return D.FuturesWiki;
    });
  },
  get JodiWorldOilDialog() {
    return this.QE.then(function (D) {
      return D.JodiWorldOil;
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
      case _Type.BrowserType.ECONOMIC:
        this._loadQE();break;
      case _Type.BrowserType.UN_COMTRADE:
        this._loadUN();break;
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