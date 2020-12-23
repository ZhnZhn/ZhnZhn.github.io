"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crTitle = _fnAdapter["default"].crTitle,
    crData = _fnAdapter["default"].crData,
    crConfOption = _fnAdapter["default"].crConfOption,
    _assign = Object.assign;

var trOption = function trOption(option) {
  return _assign(option, crTitle(option));
};

var EiaAdapter = (0, _crAdapterType["default"])({
  crData: crData,
  crConfOption: crConfOption,
  trOption: trOption
});
var _default = EiaAdapter;
exports["default"] = _default;
//# sourceMappingURL=EiaAdapter.js.map