const _SLICE = {
  chb: null,
  chart: null
};

export const isLoadToChart = () => _SLICE.chart
  ? _SLICE.chart.options.zhConfig.id
  : false

export const getActiveChart = () => _SLICE.chart

export const setActiveCheckbox = (
  isCheck,
  checkBox,
  chart
) => {
  if (isCheck){
     const _chb = _SLICE.chb;
     if (_chb && _chb !== checkBox){
       _chb.setUnchecked()
     }
     _SLICE.chb = checkBox
     _SLICE.chart = chart
  } else {
    _SLICE.chb = null
    _SLICE.chart = null
  }
}

export const uncheckActiveCheckbox = (
  chartType
) => {
  const _chb = _SLICE.chb;
  if (_chb && (!chartType || _chb.chartType === chartType)){
    _chb.setUnchecked()
    _SLICE.chb = null
    _SLICE.chart = null
  }
}

export const resetActiveChart = (
  id
) => {
  const _id = isLoadToChart();
  if (_id && _id == id) {
    _SLICE.chart = null
  }
}
