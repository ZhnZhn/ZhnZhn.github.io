import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_LINE,
  CHT_COLUMN,
  CHT_YEARLY,
  CHT_AREA_YEARLY,
  CHT_SCATTER,
  CHT_SCATTER_UP,
  CHT_SCATTER_DOWN
} from '../../constants/ChartType';
import {
  crSeriaConfig
} from '../../charts/ChartConfigFn';

import {
  ymdToUTC,
  findMinY
} from '../AdapterFn';
import {
  compareByDate
} from '../compareByFn';
import {
  getData,
  getDataColumnIndex
} from './NdlFn';

import toArea from './toArea';
import crYearlyConfig from '../toYearsByMonths';
import {
  toScatterConfig,
  toScatterSeria
} from './toScatter';

const _fToConfig = crConfig => (
  json,
  option
) => ({
  config: crConfig(getData(json), option)
});

const _fToSeria = crSeria => (
  json,
  option,
  chart
) => crSeria(getData(json), option, chart);

const _crScatterConfig = _fToConfig(toScatterConfig);
const _toYearlyByMonth = _fToConfig(crYearlyConfig);
const _rToConfig = {
  [CHT_AREA]: toArea,
  [CHT_SPLINE]: toArea,
  [CHT_LINE]: toArea,
  [CHT_COLUMN]: toArea,

  [CHT_YEARLY]: _toYearlyByMonth,
  [CHT_AREA_YEARLY]: _toYearlyByMonth,

  [CHT_SCATTER]: _crScatterConfig,
  [CHT_SCATTER_UP]: _crScatterConfig,
  [CHT_SCATTER_DOWN]: _crScatterConfig
};

const _crSeriaData = (
  data,
  yIndex
) => data
  .map(p => [ ymdToUTC(p[0]), p[yIndex] ])
  .sort(compareByDate);

const _toSeria = (
  json,
  option
) => {
  const { value:chartId } = option
  , yPointIndex = getDataColumnIndex(json, option)
  , data = _crSeriaData(getData(json), yPointIndex);
  return crSeriaConfig({
      name: chartId.substring(0,12),
      data: data,
      minY: findMinY(data)
  });
};

const _crScatterSeria = _fToSeria(toScatterSeria);
const _rToSeria = {
  DF: _toSeria,
  [CHT_SCATTER]: _crScatterSeria,
  [CHT_SCATTER_UP]: _crScatterSeria,
  [CHT_SCATTER_DOWN]: _crScatterSeria
};

const NdlAdapter = {
  toConfig(json, option){
     const { seriaType=CHT_AREA } = option;
     return _rToConfig[seriaType](json, option);
  },

  toSeries(json, option, chart){
    const { seriaType } = option
    , _toSeria = _rToSeria[seriaType] || _rToSeria.DF;
    return _toSeria(json, option, chart);
  }
};

export default NdlAdapter
