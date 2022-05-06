"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const trOption = option => (0, _fnAdapter._assign)(option, (0, _fnAdapter.crCaption)(option));

const toChart = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption,
  trOption
});
var _default = toChart;
exports.default = _default;
//# sourceMappingURL=toChart.js.map