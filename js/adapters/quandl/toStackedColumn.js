"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

var crConfig = _fnStacked["default"].crConfig;

var toStackedColumn = function toStackedColumn(json, option) {
  return crConfig({
    type: 'column',
    percentType: _Type.ChartType.STACKED_COLUMN_PERCENT,
    json: json,
    option: option
  });
};

var _default = toStackedColumn;
exports["default"] = _default;
//# sourceMappingURL=toStackedColumn.js.map