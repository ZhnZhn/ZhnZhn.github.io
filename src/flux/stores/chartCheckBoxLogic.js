const _SLICE = {
  activeCheckbox: null,
  activeChart: null
};

export const isLoadToChart = () => _SLICE.activeChart
  ?  _SLICE.activeChart.options.zhConfig.id
  : false

export const getActiveChart = () => _SLICE.activeChart

export const setActiveCheckbox = (
  isCheck,
  checkBox,
  chart
) => {
  if (isCheck){
     const activeCheckbox = _SLICE.activeCheckbox;
     if (activeCheckbox && activeCheckbox !== checkBox){
        activeCheckbox.setUnchecked()
     }
     _SLICE.activeCheckbox = checkBox
     _SLICE.activeChart = chart
  } else {
    _SLICE.activeCheckbox = null
    _SLICE.activeChart = null
  }
}

export const uncheckActiveCheckbox = (
  chartType
) => {
  const activeCheckbox = _SLICE.activeCheckbox;
  if (activeCheckbox
    && (!chartType || activeCheckbox.chartType === chartType)
  ){
     activeCheckbox.setUnchecked()
     _SLICE.activeCheckbox = null
     _SLICE.activeChart = null
  }
}

export const resetActiveChart = (id) => {
  const _activeChart = _SLICE.activeChart;
  if (
    _activeChart &&
    _activeChart.options.zhConfig.id === id
  ) {
    _SLICE.activeChart = null
  }
}
