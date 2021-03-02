import crDataMinMaxSlice from './crDataMinMaxSlice'
import crYAxisSeria from './crYAxisSeria'

const YAXIS = 'yAxis';

const _isUndef = v => typeof v === 'undefined';

const _crYAxisId = suffix => YAXIS + suffix
, _crYAxisIdFromChart = chart =>
    _crYAxisId(chart.yAxis.length);

const _checkYAxis = (chart, yIndex, name) => {
  const isNewYAxis = _isUndef(yIndex)
  , id = isNewYAxis
      ? name || _crYAxisIdFromChart(chart)
      : yIndex === 0
          ? void 0
          : _crYAxisId(yIndex);
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

//options = {color, name, yIndex, data, userMax, userMin}
//yIndex = | void 0 | 0 | number
const zhAddSeriaToYAxis = function(options={}, seriaOptions={}) {
  try {
    const {color, yIndex, name} = options
    , { id, isNewYAxis } = _checkYAxis(this, yIndex, name);
    if (isNewYAxis) {
      this.addAxis(_crAxis(id, color), false, true)
    }    
    const _seria = crYAxisSeria(this, {
      color, name,
      ...seriaOptions,
      data: crDataMinMaxSlice(options),
      yAxis: id
    })
    , _seriaInst = this.addSeries(_seria, false);
    this.redraw();
    return _seriaInst;
  } catch(err) {
    console.log(err.message)
  }
};

export default zhAddSeriaToYAxis
