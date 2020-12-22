"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    addConfOption = _fnAdapter["default"].addConfOption,
    crCaption = _fnAdapter["default"].crCaption,
    _assign = Object.assign;

var trOption = function trOption(option) {
  return _assign(option, crCaption(option));
};

var toChart = (0, _crAdapterType["default"])({
  crData: crData,
  addConfOption: addConfOption,
  trOption: trOption
});
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map