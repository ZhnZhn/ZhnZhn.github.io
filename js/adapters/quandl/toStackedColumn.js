"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ChartType = require("../../constants/ChartType");

var _fnStacked = require("./fnStacked");

const toStackedColumn = (json, option) => (0, _fnStacked.crConfig)({
  type: 'column',
  percentType: _ChartType.CHT_STACKED_COLUMN_PERCENT,
  json,
  option
});

var _default = toStackedColumn;
exports.default = _default;
//# sourceMappingURL=toStackedColumn.js.map