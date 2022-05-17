"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ChartType = require("../../constants/ChartType");

var _fnStacked = require("./fnStacked");

const toStackedArea = (json, option) => (0, _fnStacked.crConfig)({
  percentType: _ChartType.CHT_STACKED_AREA_PERCENT,
  json,
  option
});

var _default = toStackedArea;
exports.default = _default;
//# sourceMappingURL=toStackedArea.js.map