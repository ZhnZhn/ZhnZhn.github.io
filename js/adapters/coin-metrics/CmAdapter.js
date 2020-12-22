"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crTitle = _fnAdapter["default"].crTitle,
    crConfOption = _fnAdapter["default"].crConfOption,
    _assign = Object.assign;

var trOption = function trOption(option, json) {
  return _assign(option, crTitle(option, json));
};

var CmAdapter = (0, _crAdapterType["default"])({
  crData: crData,
  crConfOption: crConfOption,
  trOption: trOption
});
var _default = CmAdapter;
exports["default"] = _default;
//# sourceMappingURL=CmAdapter.js.map