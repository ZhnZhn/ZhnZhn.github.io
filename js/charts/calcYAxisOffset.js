"use strict";

exports.__esModule = true;
exports.default = void 0;

const calcYAxisOffset = function (chart) {
  let offset = 0;
  chart.yAxis.forEach(_yAxis => {
    if (!_yAxis.opposite) {
      const {
        max
      } = _yAxis.getExtremes(),
            _maxLen = max ? ('' + max).length : 0,
            _maxLabelLenght = _yAxis.maxLabelLength,
            _dx = offset === 0 ? 25 : 15;

      offset = _maxLen !== 0 ? offset + _dx + Math.round(_maxLabelLenght) : offset;
    }
  });
  return offset;
};

var _default = calcYAxisOffset;
exports.default = _default;
//# sourceMappingURL=calcYAxisOffset.js.map