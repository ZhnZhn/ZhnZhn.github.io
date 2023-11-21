"use strict";

exports.__esModule = true;
exports.default = void 0;
var _contCheckBoxLogic = require("../contCheckBoxLogic");
const getSlice = (slice, chartType) => {
  const activeContChb = (0, _contCheckBoxLogic.getActiveContCheckBox)(),
    _cT = activeContChb ? activeContChb.chartType || chartType : chartType,
    chartSlice = slice[_cT],
    {
      configs = []
    } = chartSlice || {};
  return {
    chartSlice,
    configs
  };
};
var _default = exports.default = getSlice;
//# sourceMappingURL=getSlice.js.map