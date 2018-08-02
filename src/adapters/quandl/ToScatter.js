
import { ChartType as CT } from '../../constants/Type'

import ChartConfig from '../../charts/ChartConfig'
import Tooltip from '../../charts/Tooltip'
import Builder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'

const C = {
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
}

const _crZhConfig = (option) => {
  const { dataSource } = option
      , id = AdapterFn.crId();
  return {
    id, key: id,
    isWithoutAdd: true,
    isWithLegend: false,
    dataSource
  };
}

const _calcScatterY = (option, chart) => {
  const { seriaType=CT.SCATTER_UP } = option
      , { max, min } = chart.yAxis[0]
      , onePercent = (max - min)/100;
  switch(seriaType){
    case CT.SCATTER_DOWN:
      return (min + 4*onePercent);
    default:
      return (max - 7*onePercent);
  }
}


const _updateLabelY = (p, seriaType) => {
  if (seriaType === CT.SCATTER_UP) {
     p.dataLabels.y = 0
  }
}

const _crSeria = (arr, option) => {
  const { seriaType=CT.SCATTER_UP } = option;
  const data = arr.map(p => {
    const date = p[0]
        , v = p[1]
        , _color = v >= 0 ? C.COLOR_PLUS : C.COLOR_MINUS
        , _p = ChartConfig.fMarkerExDividend(_color);

    _updateLabelY(_p, seriaType)
    return Object.assign(_p, {
         x: AdapterFn.ymdToUTC(date),
         exValue: v,
         ...p
      });
  })
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: Tooltip.exValue,
      headerFormat: ''
    },
    data: data
    //zhSeriaId : zhSeriaId
  };
}

const _getSeriaFrom = (config, option, chart) => {
  const y = _calcScatterY(option, chart)
      , seria = config.series[0]
      , _d = seria.data.map(p => {
         p.y = y
         return p;
      });
  seria.data = _d
  return seria;
}

const ToScatter = {

  toConfig: (data, option) => {
    const seria = _crSeria(data, option)
        , config = Builder()
           .areaConfig()
           .add({ zhConfig: _crZhConfig(option) })
           .toConfig();
    config.series[0] = seria
    return config;
  },

  toSeria: (data, option, chart) => {
    const config = ToScatter.toConfig(data, option)
        , seria = _getSeriaFrom(config, option, chart)
    return seria;
  }

}

export default ToScatter
