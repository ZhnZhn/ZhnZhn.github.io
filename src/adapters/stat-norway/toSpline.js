
import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const _toUTC = fnUtil.toUTC;
const {
  crDsValuesTimes, crChartOption
} = fnAdapter;

const DF_TYPE = 'spline';

const _checkOrder = data => {
  const _isReverse = data.length > 2
    && data[0].x > data[1].x
  return _isReverse ? data.reverse() : data;
};

const _toData = (values, times ) => {
  const _values = Array.isArray(values)
           ? values
           : [ values ];
  const data = times.map((time, i) => ({
    x: _toUTC(time),
    y: _values[i] ? _values[i].value : null
  }))
  return _checkOrder(data);
};

const _crSplineSeria = (data, option={}) => {
  const { seriaType, seriaColor } = option
      , _type = typeof seriaType === 'string'
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
}


const toArea = {
  crConfig: (json, option) => {
    const { title='', subtitle } = option
      , { ds, values, times } = crDsValuesTimes(json, option)
      , data = _toData(values, times)
      , seria = _crSplineSeria(data, option)
      , config = Builder()
         .areaConfig({ spacingTop: 25 })
         .addCaption(title, subtitle)
         .clearSeries()
         .addSeries(seria)
         .addMinMax(data, option)
         .add({ ...crChartOption(ds, data, option) })
         .toConfig()

       return config;
   }
}

export default toArea
