"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    addConfOption = _fnAdapter["default"].addConfOption;
var OnsAdapter = (0, _crAdapterType["default"])({
  crData: crData,
  addConfOption: addConfOption
});
var _default = OnsAdapter;
exports["default"] = _default;
//# sourceMappingURL=OnsAdapter.js.map