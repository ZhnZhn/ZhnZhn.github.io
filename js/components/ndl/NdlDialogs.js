"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _UNCommodityTradeDialog = _interopRequireDefault(require("./UNCommodityTradeDialog"));
var _Futures3Dialog = _interopRequireDefault(require("./Futures3Dialog"));
var _FuturesWikiDialog = _interopRequireDefault(require("./FuturesWikiDialog"));
var _JodiWorldOilDialog = _interopRequireDefault(require("./JodiWorldOilDialog"));
const Dialogs = {
  UNCommodityTrade: _UNCommodityTradeDialog.default,
  Futures3: _Futures3Dialog.default,
  FuturesWiki: _FuturesWikiDialog.default,
  JodiWorldOil: _JodiWorldOilDialog.default
};
var _default = Dialogs;
exports.default = _default;
//# sourceMappingURL=NdlDialogs.js.map