"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AlphaIndicatorDialog = _interopRequireDefault(require("./AlphaIndicatorDialog"));
var _AlphaTopDialog = _interopRequireDefault(require("./AlphaTopDialog"));
var _AlphaSearchDialog = _interopRequireDefault(require("./AlphaSearchDialog"));
const AlphaDialog = {
  Indicator: _AlphaIndicatorDialog.default,
  Top: _AlphaTopDialog.default,
  Search: _AlphaSearchDialog.default
};
var _default = AlphaDialog;
exports.default = _default;
//# sourceMappingURL=AlphaDialogs.js.map