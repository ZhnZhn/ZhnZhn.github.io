import trIfCategoryCase from './trIfCategoryCase'

const YAXIS = 'yAxis';

const _isArr = Array.isArray;

const _crYAxisId = indexOrChart => indexOrChart
  && _isArr(indexOrChart.yAxis)
    ? YAXIS + indexOrChart.yAxis.length
    : YAXIS + indexOrChart;

const _checkYAxis = (index, chart) => {
  const isNewYAxis = index === -1
  , id = isNewYAxis
      ? _crYAxisId(chart)
      : index === 0
          ? void 0
          : _crYAxisId(index);
  return { id, isNewYAxis };
};

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

const _findDataIndex = (data, v) => {
  const _max = data.length;
  let i = 0;
  for (i; i<_max; i++) {
    if (data[i][0] >= v) {
      return i;
    }
  }
  return i;
};

const _crData = ({ data, userMin, userMax }) => {
  if (!_isArr(data) || !_isArr(data[0])
        || !userMin || !userMax) {
    return data;
  }
  const _fromIndex = _findDataIndex(data, userMin)
  , _toIndex = _findDataIndex(data, userMax);
  return _fromIndex <= _toIndex
    ? data.slice(_fromIndex, _toIndex+1)
    : data;
};

const zhAddSeriaToYAxis = function(options={}, seriaOptions={}) {
  try {
    const { color, yIndex=-1 } = options
    , { id, isNewYAxis } = _checkYAxis(yIndex, this);
    if (isNewYAxis) {
      this.addAxis(_crAxis(id, color), false, true)
    }
    const {
      data, seriaOption
    } = trIfCategoryCase(this, _crData(options), seriaOptions)
    , _seria = this.addSeries(_crSeria({
      id, color, data }, seriaOption), false
    );
    this.redraw();
    return _seria;
  } catch(err) {
    console.log(err.message)
  }
};

export default zhAddSeriaToYAxis
