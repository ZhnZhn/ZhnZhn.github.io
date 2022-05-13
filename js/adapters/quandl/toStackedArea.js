"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartType = require("../../constants/ChartType");

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

const {
  crConfig
} = _fnStacked.default;

const toStackedArea = (json, option) => crConfig({
  percentType: _ChartType.CHT_STACKED_AREA_PERCENT,
  json,
  option
});

var _default = toStackedArea;
exports.default = _default;
//# sourceMappingURL=toStackedArea.js.map