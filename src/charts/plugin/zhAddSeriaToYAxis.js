
const YAXIS = 'yAxis';

const _crYAxisId = indexOrChart => indexOrChart
  && Array.isArray(indexOrChart.yAxis)
    ? YAXIS + indexOrChart.yAxis.length
    : YAXIS + indexOrChart;

const _checkYAxis = (index, chart) => {
  const isNewYAxis = index === -1
  , id = isNewYAxis
      ? _crYAxisId(chart)
      : index === 0
          ? undefined
          : _crYAxisId(index);
  return { id, isNewYAxis };
}

const _crAxis = (id, color) => ({
    id: id,
    opossite: true,
    title: {
      text: ''
    },
    lineColor: color,
    tickColor: color,
    gridLineWidth: 0,
    labels: {
      style: {
        color: color
      }
    },
    showEmpty: false
});

const _crSeria = ({ id, color, data }, options) => ({
  type: 'spline',
  yAxis: id,
  color: color,
  data: data,
  ...options
});

const zhAddSeriaToYAxis = (Chart) => {
  Chart.prototype.zhAddSeriaToYAxis = function(options, seriaOptions) {
    try {
      const { data, color, index=-1 } = options;
      const { id, isNewYAxis } = _checkYAxis(index, this);
      if (isNewYAxis) {
        this.addAxis(_crAxis(id, color), false, true)
      }
      const _seria = this.addSeries(_crSeria({
        id, color, data }, seriaOptions), false
      );
      this.redraw();
      return _seria;
    } catch(err) {
      console.log(err.message)
    }
  }
}

export default zhAddSeriaToYAxis
