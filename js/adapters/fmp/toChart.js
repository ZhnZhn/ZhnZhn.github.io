"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const trOption = option => (0, _fnAdapter._assign)(option, (0, _fnAdapter.crCaption)(option));
const toChart = (0, _crAdapterType.crAdapterType1)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption,
  trOption
});
var _default = exports.default = toChart;
//# sourceMappingURL=toChart.js.map