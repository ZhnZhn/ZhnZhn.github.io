"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfOption = _fnAdapter["default"].crConfOption;
var BeaAdapter = (0, _crAdapterType["default"])({
  crData: crData,
  crConfOption: crConfOption
});
var _default = BeaAdapter;
exports["default"] = _default;
//# sourceMappingURL=BeaAdapter.js.map