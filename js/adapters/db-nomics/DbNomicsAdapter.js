"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crTitle = _fnAdapter["default"].crTitle,
    crConfOption = _fnAdapter["default"].crConfOption,
    _assign = Object.assign,
    trOption = function trOption(option, json) {
  _assign(option, crTitle(option, json));
};

var DbNomicsAdapter = (0, _crAdapterType["default"])({
  crData: crData,
  crConfOption: crConfOption,
  trOption: trOption
});
var _default = DbNomicsAdapter;
exports["default"] = _default;
//# sourceMappingURL=DbNomicsAdapter.js.map