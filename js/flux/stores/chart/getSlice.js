"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var getSlice = function getSlice(slice, chartType) {
  var activeContChb = slice.activeContChb,
      _cT = activeContChb ? activeContChb.chartType || chartType : chartType,
      chartSlice = slice[_cT],
      _ref = chartSlice || {},
      _ref$configs = _ref.configs,
      configs = _ref$configs === void 0 ? [] : _ref$configs;

  return {
    chartSlice: chartSlice,
    configs: configs
  };
};

var _default = getSlice;
exports["default"] = _default;
//# sourceMappingURL=getSlice.js.map