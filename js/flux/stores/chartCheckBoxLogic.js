"use strict";

exports.__esModule = true;
exports.uncheckActiveCheckbox = exports.setActiveCheckbox = exports.resetActiveChart = exports.isLoadToChart = exports.getActiveChart = void 0;
const _SLICE = {
  activeCheckbox: null,
  activeChart: null
};
const isLoadToChart = () => _SLICE.activeChart ? _SLICE.activeChart.options.zhConfig.id : false;
exports.isLoadToChart = isLoadToChart;
const getActiveChart = () => _SLICE.activeChart;
exports.getActiveChart = getActiveChart;
const setActiveCheckbox = (isCheck, checkBox, chart) => {
  if (isCheck) {
    const activeCheckbox = _SLICE.activeCheckbox;
    if (activeCheckbox && activeCheckbox !== checkBox) {
      activeCheckbox.setUnchecked();
    }
    _SLICE.activeCheckbox = checkBox;
    _SLICE.activeChart = chart;
  } else {
    _SLICE.activeCheckbox = null;
    _SLICE.activeChart = null;
  }
};
exports.setActiveCheckbox = setActiveCheckbox;
const uncheckActiveCheckbox = chartType => {
  const activeCheckbox = _SLICE.activeCheckbox;
  if (activeCheckbox && (!chartType || activeCheckbox.chartType === chartType)) {
    activeCheckbox.setUnchecked();
    _SLICE.activeCheckbox = null;
    _SLICE.activeChart = null;
  }
};
exports.uncheckActiveCheckbox = uncheckActiveCheckbox;
const resetActiveChart = id => {
  const _activeChart = _SLICE.activeChart;
  if (_activeChart && _activeChart.options.zhConfig.id === id) {
    _SLICE.activeChart = null;
  }
};
exports.resetActiveChart = resetActiveChart;
//# sourceMappingURL=chartCheckBoxLogic.js.map