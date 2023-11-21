"use strict";

exports.__esModule = true;
exports.uncheckActiveCheckbox = exports.setActiveCheckbox = exports.resetActiveChart = exports.isLoadToChart = exports.getActiveChart = void 0;
const _SLICE = {
  chb: null,
  chart: null
};
const isLoadToChart = () => _SLICE.chart ? _SLICE.chart.options.zhConfig.id : false;
exports.isLoadToChart = isLoadToChart;
const getActiveChart = () => _SLICE.chart;
exports.getActiveChart = getActiveChart;
const setActiveCheckbox = (isCheck, checkBox, chart) => {
  if (isCheck) {
    const _chb = _SLICE.chb;
    if (_chb && _chb !== checkBox) {
      _chb.setUnchecked();
    }
    _SLICE.chb = checkBox;
    _SLICE.chart = chart;
  } else {
    _SLICE.chb = null;
    _SLICE.chart = null;
  }
};
exports.setActiveCheckbox = setActiveCheckbox;
const uncheckActiveCheckbox = chartType => {
  const _chb = _SLICE.chb;
  if (_chb && (!chartType || _chb.chartType === chartType)) {
    _chb.setUnchecked();
    _SLICE.chb = null;
    _SLICE.chart = null;
  }
};
exports.uncheckActiveCheckbox = uncheckActiveCheckbox;
const resetActiveChart = id => {
  const _id = isLoadToChart();
  if (_id && _id == id) {
    _SLICE.chart = null;
  }
};
exports.resetActiveChart = resetActiveChart;
//# sourceMappingURL=chartCheckBoxLogic.js.map