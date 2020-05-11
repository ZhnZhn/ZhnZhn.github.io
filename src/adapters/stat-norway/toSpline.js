import Builder from '../../charts/ConfigBuilder'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const { toUTC, compose } = fnUtil;
const {
  crDsValuesTimes, crChartOption
} = fnAdapter;

const _isArr = Array.isArray;

const _filterLeadingNulls = data => {
  const _len = data.length;
  let i = 0;
  for(i; i<_len; i++){
    if (data[i].y !== null) break;
  }
  return data.slice(i);
};

const _isReverse = data => data.length > 2
  && data[0].x > data[1].x;
const _checkOrder = data => _isReverse(data)
  ? data.reverse()
  : data;

const _fCrDataPoint = (values) => (time, i) => ({
  x: toUTC(time),
  y: values[i] ? values[i].value : null
});

const _postProcessData = compose(
  _filterLeadingNulls,
  _checkOrder
);

const _toData = (values, times) => {
  const _values = _isArr(values) ? values : [values]
  , _crPoint = _fCrDataPoint(_values);
  return _isArr(times)
    ? _postProcessData(times.map(_crPoint))
    : [];
};

const toArea = {
  crConfig: (json, option) => {
    const {
      title='', subtitle,
      seriaType, seriaColor, seriaWidth
    } = option
    , { ds, values, times } = crDsValuesTimes(json, option)
    , data = _toData(values, times)
    , seria = Builder()
        .splineSeria({
          seriaType,
          seriaColor,
          seriaWidth,
          data
        })
        .toSeria()
    return Builder()
      .areaConfig({ spacingTop: 25 })
      .addCaption(title, subtitle)
      .clearSeries()
      .addSeries(seria)
      .addMinMax(data, option)
      .add({ ...crChartOption(ds, data, option) })
      .toConfig();
   }
};

export default toArea
