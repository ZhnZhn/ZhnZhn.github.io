
const calcDeltaYAxis = function(chart) {
  let delta = 0;
  chart.yAxis.forEach(_yAxis => {
    if (!_yAxis.opposite) {
      const { max } = _yAxis.getExtremes()
          , _maxLen = max ? (''+max).length : 0
          , _maxLabelLenght = _yAxis.maxLabelLength
          , _offset = delta === 0 ? 25 : 15;
      delta = _maxLen !== 0
        ? delta + _offset + Math.round(_maxLabelLenght)
        : delta;
    }
  })
  return delta;
}

export default calcDeltaYAxis
