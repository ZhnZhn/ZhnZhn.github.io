"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AlphaIndicatorDialog = _interopRequireDefault(require("./AlphaIndicatorDialog"));

var _AlphaSectorDialog = _interopRequireDefault(require("./AlphaSectorDialog"));

var _AlphaSearchDialog = _interopRequireDefault(require("./AlphaSearchDialog"));

var AlphaDialog = {
  Indicator: _AlphaIndicatorDialog["default"],
  Sector: _AlphaSectorDialog["default"],
  Search: _AlphaSearchDialog["default"]
};
var _default = AlphaDialog;
exports["default"] = _default;
//# sourceMappingURL=AlphaDialogs.js.map