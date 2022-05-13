"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartType = require("../../constants/ChartType");

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

const {
  crConfig
} = _fnStacked.default;

const toStackedColumn = (json, option) => crConfig({
  type: 'column',
  percentType: _ChartType.CHT_STACKED_COLUMN_PERCENT,
  json,
  option
});

var _default = toStackedColumn;
exports.default = _default;
//# sourceMappingURL=toStackedColumn.js.map