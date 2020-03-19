"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;
var zhDetailCharts = {
  zhGetDetailCharts: function zhGetDetailCharts() {
    return (this.options || {}).zhDetailCharts;
  },
  zhAddDetailChart: function zhAddDetailChart(detailChart) {
    var _charts = this.zhGetDetailCharts();

    if (_isArr(_charts)) {
      _charts.push(detailChart);
    }
  },
  zhRemoveDetailChart: function zhRemoveDetailChart(detailChart) {
    var _charts = this.zhGetDetailCharts();

    if (_isArr(_charts)) {
      this.options.zhDetailCharts = _charts.filter(function (chart) {
        return chart !== detailChart;
      });
    }
  }
};
var _default = zhDetailCharts;
exports["default"] = _default;
//# sourceMappingURL=zhDetailCharts.js.map