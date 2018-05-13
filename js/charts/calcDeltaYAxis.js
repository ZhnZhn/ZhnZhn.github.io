'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = calcDeltaYAxis;
//# sourceMappingURL=calcDeltaYAxis.js.map