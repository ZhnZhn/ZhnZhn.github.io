"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _Type = require("../../constants/Type");

var _Dialogs = _interopRequireDefault(require("../../components/dialogs/Dialogs"));

var MSG_OFFLINE = 'It seems you are offline';

var _resolve = Promise.resolve.bind(Promise);

var _router = {
  DEFAULT: _Dialogs["default"].Type3,
  DialogSelectN: _Dialogs["default"].SelectN,
  DialogType3: _Dialogs["default"].Type3,
  _loadGD: function _loadGD() {
    var _this = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return this.GD = Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/dialogs/GeneralDialogs.js"));
      }).then(function (module) {
        return _this.GD = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/dialogs/GeneralDialogs"));
    }).then(function (module) {
      return _this.GD = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getGD: function getGD() {
    return this.GD || this._loadGD();
  },

  get DialogQuery() {
    return this.getGD().then(function (D) {
      return D.Query;
    });
  },

  get DialogType4() {
    return this.getGD().then(function (D) {
      return D.Type4;
    });
  },

  get DialogType4A() {
    return this.getGD().then(function (D) {
      return D.Type4A;
    });
  },

  get DialogType5() {
    return this.getGD().then(function (D) {
      return D.Type5;
    });
  },

  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/chart-config/ChartConfigDialog.js"));
      }).then(function (module) {
        return module["default"];
      });
    }
    /*eslint-enable no-undef */


    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/chart-config/ChartConfigDialog"));
    }).then(function (module) {
      return module["default"];
    });
  },

  _loadUN: function _loadUN() {
    var _this2 = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return this.UN = Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/uncomtrade/UnDialogs.js"));
      }).then(function (module) {
        return _this2.UN = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/uncomtrade/UnDialogs"));
    }).then(function (module) {
      return _this2.UN = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getUN: function getUN() {
    return this.UN || this._loadUN();
  },

  get UnDialog5() {
    return this.getUN().then(function (D) {
      return D.UnDialog5;
    });
  },

  _loadSM: function _loadSM() {
    var _this3 = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/stock-markets/AlphaDialogs.js"));
      }).then(function (module) {
        return _this3.SM = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/stock-markets/AlphaDialogs"));
    }).then(function (module) {
      return _this3.SM = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getSM: function getSM() {
    return this.SM || this._loadSM();
  },

  get AlphaIndicatorDialog() {
    return this.getSM().then(function (D) {
      return D.Indicator;
    });
  },

  get AlphaSectorDialog() {
    return this.getSM().then(function (D) {
      return D.Sector;
    });
  },

  get AlphaSearchDialog() {
    return this.getSM().then(function (D) {
      return D.Search;
    });
  },

  _loadSD: function _loadSD() {
    var _this4 = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/stat-dialogs/StatDialogs.js"));
      }).then(function (module) {
        return _this4.SD = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/stat-dialogs/StatDialogs"));
    }).then(function (module) {
      return _this4.SD = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getSD: function getSD() {
    return this.SD || this._loadSD();
  },

  get DialogStatN() {
    return this.getSD().then(function (D) {
      return D.StatN;
    });
  },

  _loadUSAE: function _loadUSAE() {
    var _this5 = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/usa-economy/UsaeDialogs.js"));
      }).then(function (module) {
        return _this5.USAE = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/usa-economy/UsaeDialogs"));
    }).then(function (module) {
      return _this5.USAE = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getUSAE: function getUSAE() {
    return this.USAE || this._loadUSAE();
  },

  get ZillowDialog() {
    return this.getUSAE().then(function (D) {
      return D.Zillow;
    });
  },

  _loadQE: function _loadQE() {
    var _this6 = this;

    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require("js/components/quandl/QuandlDialogs.js"));
      }).then(function (module) {
        return _this6.QE = _resolve(module["default"]);
      })["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
      /*eslint-enable no-undef */
    }

    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/quandl/QuandlDialogs"));
    }).then(function (module) {
      return _this6.QE = _resolve(module["default"]);
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  },
  getQE: function getQE() {
    return this.QE || this._loadQE();
  },

  get UNCommodityTradeDialog() {
    return this.getQE().then(function (D) {
      return D.UNCommodityTrade;
    });
  },

  get Futures3Dialog() {
    return this.getQE().then(function (D) {
      return D.Futures3;
    });
  },

  get FuturesWikiDialog() {
    return this.getQE().then(function (D) {
      return D.FuturesWiki;
    });
  },

  get JodiWorldOilDialog() {
    return this.getQE().then(function (D) {
      return D.JodiWorldOil;
    });
  },

  loadDialogs: function loadDialogs(browserType) {
    switch (browserType) {
      case _Type.BrowserType.STOCK_MARKETS:
        this._loadSM();

        break;

      case _Type.BrowserType.NORWAY_STATISTICS:
      case _Type.BrowserType.SWEDEN_STAT:
        this._loadSD();

        break;

      case _Type.BrowserType.QUANDL:
        this._loadQE();

        break;

      case _Type.BrowserType.UN_COMTRADE:
        this._loadUN();

        break;

      default:
        return;
    }
  }
};
var RouterDialog = {
  getDialog: function getDialog(type) {
    if (type && typeof _router[type] !== undefined) {
      return Promise.resolve(_router[type]);
    } else {
      return Promise.resolve(_router['DEFAULT']);
    }
  },
  loadDialogs: function loadDialogs(browserType) {
    _router.loadDialogs(browserType);
  }
};
var _default = RouterDialog;
exports["default"] = _default;
//# sourceMappingURL=RouterDialog.js.map