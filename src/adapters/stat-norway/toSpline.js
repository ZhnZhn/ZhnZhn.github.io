
import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const { toUTC, compose } = fnUtil;
const {
  crDsValuesTimes, crChartOption
} = fnAdapter;

const DF_TYPE = 'spline';

const _isArr = Array.isArray;
const _isStr = str => typeof str === 'string';

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

const _crSplineSeria = (data, option={}) => {
  const { seriaType, seriaColor } = option
  , _type = _isStr(seriaType)
      ? seriaType.toLowerCase()
      : DF_TYPE;
  return Object.assign(ChartConfig.fSeries(), {
     type: _type,
     color: seriaColor,
     visible: true,
     data: data,
     marker: {
       symbol: 'circle'
     },
     zhSeriaId: fnAdapter.crId()
  });
};

const toArea = {
  crConfig: (json, option) => {
    const { title='', subtitle } = option
    , { ds, values, times } = crDsValuesTimes(json, option)
    , data = _toData(values, times)
    , seria = _crSplineSeria(data, option);
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
