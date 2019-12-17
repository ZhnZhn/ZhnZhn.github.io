"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var calcDeltaYAxis = function calcDeltaYAxis(chart) {
  var delta = 0;
  chart.yAxis.forEach(function (_yAxis) {
    if (!_yAxis.opposite) {
      var _yAxis$getExtremes = _yAxis.getExtremes(),
          max = _yAxis$getExtremes.max,
          _maxLen = max ? ('' + max).length : 0,
          _maxLabelLenght = _yAxis.maxLabelLength,
          _offset = delta === 0 ? 25 : 15;

      delta = _maxLen !== 0 ? delta + _offset + Math.round(_maxLabelLenght) : delta;
    }
  });
  return delta;
};

var _default = calcDeltaYAxis;
exports["default"] = _default;
//# sourceMappingURL=calcDeltaYAxis.js.map