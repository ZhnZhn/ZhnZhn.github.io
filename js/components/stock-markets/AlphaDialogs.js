"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AlphaVantage = _interopRequireDefault(require("../../adapters/alpha/AlphaVantage"));
var _AlphaIndicatorDialog = _interopRequireDefault(require("./AlphaIndicatorDialog"));
var _AlphaTopDialog = _interopRequireDefault(require("./AlphaTopDialog"));
var _AlphaSearchDialog = _interopRequireDefault(require("./AlphaSearchDialog"));
const AlphaDialog = {
  _a: _AlphaVantage.default,
  Indicator: _AlphaIndicatorDialog.default,
  Top: _AlphaTopDialog.default,
  Search: _AlphaSearchDialog.default
};
var _default = exports.default = AlphaDialog;
//# sourceMappingURL=AlphaDialogs.js.map