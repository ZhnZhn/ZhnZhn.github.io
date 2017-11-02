import JSONstat from 'jsonstat';

import ChartConfig from '../../charts/ChartConfig'
import ConfigBuilder from '../../charts/ConfigBuilder'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const _toUTC = fnUtil.toUTC
const _crZhConfig = fnAdapter.crZhConfig
const _crInfo = fnAdapter.crInfo

const _crAreaMapSlice = (items) => {
  const mapSlice = {};
  items.forEach(item => {
    if (item.slice) {
      Object.assign(mapSlice, item.slice)
    }
  })
  return mapSlice;
}

const _toData = (values, times ) => {
  const data = [];
  times.forEach((time, index) => {
    data.push({
      x: _toUTC(time),
      y: values[index].value
    })
  })
  return data;
}

const _crSplineSeria = (data, option={}) => {
  const { metric:id="id" } = option
  return Object.assign(ChartConfig.fSeries(), {
            type: 'spline',
            visible: true,
            data: data,
            marker: {
              symbol: 'circle'
            },
            //zhSeriaId: ticket + '_' + valueText ,
            zhSeriaId: id
            //zhValueText: valueText
          }, option);
}


const toArea = {
  crConfig: (json, option) => {
    const { title='', subtitle, items } = option
      , mapSlice = _crAreaMapSlice(items)
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
         .add('info', _crInfo(ds))
         .add('zhConfig', _crZhConfig(option))
         .toConfig()
       
       return config;
   }
}

export default toArea
