"use strict";

exports.__esModule = true;
exports.getSubSliceOf = void 0;
var _contCheckBoxLogic = require("../contCheckBoxLogic");
const getSubSliceOf = (slice, chartTypeOfSubSlice) => {
  const activeContChb = (0, _contCheckBoxLogic.getActiveContCheckBox)(),
    chartSlice = slice[activeContChb && activeContChb.chartType || chartTypeOfSubSlice];
  return [chartSlice, (chartSlice || {}).configs || []];
};
exports.getSubSliceOf = getSubSliceOf;
//# sourceMappingURL=getSubSliceOf.js.map