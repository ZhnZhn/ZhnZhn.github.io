"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AvStockMarkets = _interopRequireDefault(require("../../adapters/av-sm/AvStockMarkets"));
var _AvIndicatorDialog = _interopRequireDefault(require("./AvIndicatorDialog"));
var _AvTopDialog = _interopRequireDefault(require("./AvTopDialog"));
var _AvSearchDialog = _interopRequireDefault(require("./AvSearchDialog"));
const AvDialog = {
  _a: _AvStockMarkets.default,
  Indicator: _AvIndicatorDialog.default,
  Top: _AvTopDialog.default,
  Search: _AvSearchDialog.default
};
var _default = exports.default = AvDialog;
//# sourceMappingURL=AvDialogs.js.map