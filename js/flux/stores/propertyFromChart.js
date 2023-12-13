"use strict";

exports.__esModule = true;
exports.getCopyFromChart = exports.copyChart = void 0;
let _fromChart;
const copyChart = chart => {
  _fromChart = chart;
};
exports.copyChart = copyChart;
const getCopyFromChart = () => _fromChart;
exports.getCopyFromChart = getCopyFromChart;
//# sourceMappingURL=propertyFromChart.js.map