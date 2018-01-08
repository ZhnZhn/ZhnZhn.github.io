'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UNCommodityTradeDialog = require('./UNCommodityTradeDialog');

var _UNCommodityTradeDialog2 = _interopRequireDefault(_UNCommodityTradeDialog);

var _Futures3Dialog = require('./Futures3Dialog');

var _Futures3Dialog2 = _interopRequireDefault(_Futures3Dialog);

var _FuturesWikiDialog = require('./FuturesWikiDialog');

var _FuturesWikiDialog2 = _interopRequireDefault(_FuturesWikiDialog);

var _JodiWorldOilDialog = require('./JodiWorldOilDialog');

var _JodiWorldOilDialog2 = _interopRequireDefault(_JodiWorldOilDialog);

var _ZillowDialog = require('./ZillowDialog');

var _ZillowDialog2 = _interopRequireDefault(_ZillowDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialogs = {
  UNCommodityTrade: _UNCommodityTradeDialog2.default,
  Futures3: _Futures3Dialog2.default,
  FuturesWiki: _FuturesWikiDialog2.default,
  JodiWorldOil: _JodiWorldOilDialog2.default,
  Zillow: _ZillowDialog2.default
};

exports.default = Dialogs;
//# sourceMappingURL=Dialogs.js.map