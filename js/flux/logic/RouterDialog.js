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

var _DialogEurostat = require('../../components/dialogs/DialogEurostat');

var _DialogEurostat2 = _interopRequireDefault(_DialogEurostat);

var _DialogEurostat3 = require('../../components/dialogs/DialogEurostat2');

var _DialogEurostat4 = _interopRequireDefault(_DialogEurostat3);

var _DialogEurostat5 = require('../../components/dialogs/DialogEurostat3');

var _DialogEurostat6 = _interopRequireDefault(_DialogEurostat5);

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

var _AlphaIndicatorDialog = require('../../components/quandl-browser/AlphaIndicatorDialog');

var _AlphaIndicatorDialog2 = _interopRequireDefault(_AlphaIndicatorDialog);

var _AlphaSectorDialog = require('../../components/quandl-browser/AlphaSectorDialog');

var _AlphaSectorDialog2 = _interopRequireDefault(_AlphaSectorDialog);

var _AlphaIntradayDialog = require('../../components/quandl-browser/AlphaIntradayDialog');

var _AlphaIntradayDialog2 = _interopRequireDefault(_AlphaIntradayDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _router = {
  DEFAULT: _DialogType2.default,

  DialogType3: _DialogType2.default,
  DialogType4: _DialogType4.default,
  DialogType4A: _DialogType4A2.default,
  DialogType5: _DialogType6.default,
  DialogEurostat: _DialogEurostat2.default,
  DialogEurostat2: _DialogEurostat4.default,
  DialogEurostat3: _DialogEurostat6.default,
  UNCommodityTradeDialog: _UNCommodityTradeDialog2.default,
  Futures3Dialog: _Futures3Dialog2.default,
  FuturesWikiDialog: _FuturesWikiDialog2.default,
  JodiWorldOilDialog: _JodiWorldOilDialog2.default,
  ZillowDialog: _ZillowDialog2.default,
  AlphaIndicatorDialog: _AlphaIndicatorDialog2.default,
  AlphaSectorDialog: _AlphaSectorDialog2.default,
  AlphaIntradayDialog: _AlphaIntradayDialog2.default,

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
  }

};

var RouterDialog = {
  getDialog: function getDialog(type) {
    if (type && (0, _typeof3.default)(_router[type]) !== undefined) {
      return Promise.resolve(_router[type]);
    } else {
      return Promise.resolve(_router['DEFAULT']);
    }
  }
};

exports.default = RouterDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\RouterDialog.js.map