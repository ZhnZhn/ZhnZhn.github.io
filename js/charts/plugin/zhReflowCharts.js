"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _calcYAxisOffset = _interopRequireDefault(require("../calcYAxisOffset"));

const _isArr = Array.isArray;

function zhReflowCharts(isAnimate, width) {
  const _isAnimate = isAnimate && this.zhIsAnimation(),
        zhDetailCharts = this.zhGetDetailCharts();

  this.setSize(width, void 0, _isAnimate);

  if (_isArr(zhDetailCharts)) {
    const spacingLeft = (0, _calcYAxisOffset.default)(this);
    zhDetailCharts.forEach(chart => {
      if (spacingLeft) {
        chart.update({
          chart: {
            spacingLeft
          }
        }, false);
      }

      chart.setSize(width, void 0, _isAnimate);
    });
  }
}

var _default = zhReflowCharts;
exports.default = _default;
//# sourceMappingURL=zhReflowCharts.js.map