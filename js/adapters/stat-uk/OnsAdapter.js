"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const OnsAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption
});
var _default = OnsAdapter;
exports.default = _default;
//# sourceMappingURL=OnsAdapter.js.map