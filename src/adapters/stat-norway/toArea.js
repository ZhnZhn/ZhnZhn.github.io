import JSONstat from 'jsonstat';

import ChartConfig from '../../charts/ChartConfig'
import ConfigBuilder from '../../charts/ConfigBuilder'

import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const _toUTC = fnUtil.toUTC;
const { crChartOption } = fnAdapter;


const _crAreaMapSlice = (option) => {
  const { items, dfTSlice } = option
      , mapSlice = {};
  items.forEach(item => {
    if (item.slice) {
      Object.assign(mapSlice, item.slice)
    }
  })
  return Object.assign(mapSlice, dfTSlice);
}

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
  return Object.assign(ChartConfig.fSeries(), {
     type: 'spline',
     visible: true,
     data: data,
     marker: {
       symbol: 'circle'
     },
     zhSeriaId: fnAdapter.crId()
  }, option);
}


const toArea = {
  crConfig: (json, option) => {
    const { title='', subtitle } = option
      , mapSlice = _crAreaMapSlice(option)
      , ds = JSONstat(json).Dataset(0)
      , values = ds.Data(mapSlice)
      , times = ds.Dimension("Tid").id
      , data = _toData(values, times)
      , seria = _crSplineSeria(data, option)
      , config = ConfigBuilder()
         .initBaseArea()
         .add('chart', { spacingTop: 25 })
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
