import {
  CHT_SCATTER_UP,
  CHT_SCATTER_DOWN
} from '../../constants/ChartType';

import { crMarkerExDividend } from '../../charts/MarkerFn';
import { tooltipExValue } from '../../charts/Tooltip';
import Builder from '../../charts/ConfigBuilder';

import { ymdToUTC } from '../AdapterFn';
import { crId } from '../crFn';

const COLOR_PLUS = '#4caf50'
, COLOR_MINUS = '#f44336'
, _assign = Object.assign;

const _crZhConfig = ({
  dataSource
}) => {
  const id = crId();
  return {
    id,
    key: id,
    dataSource
  };
}

const _calcScatterY = (
  option,
  chart
) => {
  const { seriaType=CHT_SCATTER_UP } = option
  , { max, min } = chart.yAxis[0]
  , onePercent = (max - min)/100;
  return seriaType === CHT_SCATTER_DOWN
    ? min + 4*onePercent
    : max - 7*onePercent;
}

const _updateLabelY = (
  p,
  seriaType
) => {
  if (seriaType === CHT_SCATTER_UP) {
     p.dataLabels.y = 0
  }
}

const _crSeria = (
  arr,
  option
) => {
  const { seriaType=CHT_SCATTER_UP } = option
  , data = arr.map(p => {
     const date = p[0]
     , v = p[1]
     , _color = v >= 0 ? COLOR_PLUS : COLOR_MINUS
     , _p = crMarkerExDividend(_color);

     _updateLabelY(_p, seriaType)
     return _assign(_p, {
        x: ymdToUTC(date),
        exValue: v,
        ...p
     });
  })
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: tooltipExValue,
      headerFormat: ''
    },
    data: data
  };
}

const _getSeriaFrom = (
  config,
  option,
  chart
) => {
  const y = _calcScatterY(option, chart)
  , seria = config.series[0]
  , _d = seria.data.map(p => {
     p.y = y
     return p;
  });
  seria.data = _d
  return seria;
}

export const toScatterConfig = (
  data,
  option
) => {
   const config = Builder()
     .areaConfig()
     .add({ zhConfig: _crZhConfig(option) })
     .toConfig();
   config.series[0] = _crSeria(data, option)
   return config;
}

export const toScatterSeria = (
  data,
  option,
  chart
) => _getSeriaFrom(
  toScatterConfig(data, option),
  option,
  chart
);
