
import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'

import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const _toUTC = fnUtil.toUTC;
const {
  crDsValuesTimes, crChartOption
} = fnAdapter;

const DF_TYPE = 'spline';

const _toData = (values, times ) => {
  const _values = Array.isArray(values)
           ? values
           : [ values ];
  const data = times.map((time, i) => ({
    x: _toUTC(time),
    y: _values[i].value
  }))

  return data;
}

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
         .add({
           ...crChartOption(ds, data, option),
           zhFnAddSeriesSma: fnAddSeriesSma,
           zhFnRemoveSeries: fnRemoveSeries
         })
         .toConfig()

       return config;
   }
}

export default toArea
