"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const CmAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption
});
var _default = CmAdapter;
exports.default = _default;
//# sourceMappingURL=CmAdapter.js.map