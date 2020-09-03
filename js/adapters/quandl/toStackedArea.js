"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

var crConfig = _fnStacked["default"].crConfig;

var toStackedArea = function toStackedArea(json, option) {
  return crConfig({
    percentType: _Type.ChartType.STACKED_AREA_PERCENT,
    json: json,
    option: option
  });
};

var _default = toStackedArea;
exports["default"] = _default;
//# sourceMappingURL=toStackedArea.js.map