import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_LINE,
  CHT_COLUMN,
  CHT_YEARLY,
  CHT_AREA_YEARLY
} from '../../constants/ChartType';
import { crSeriaConfig } from '../../charts/ChartConfigFn';

import {
  crGetRoute,
  ymdToUTC,
  findMinY
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';

import { getData } from './NdlFn';

import toArea from './toArea';
import crYearlyConfig from '../toYearsByMonths';

const _fToConfig = crConfig => (
  json,
  option
) => ({
  config: crConfig(getData(json), option)
});

const _toYearlyByMonth = _fToConfig(crYearlyConfig)
, _getCrConfig = crGetRoute({
  [CHT_AREA]: toArea,
  [CHT_SPLINE]: toArea,
  [CHT_LINE]: toArea,
  [CHT_COLUMN]: toArea,

  [CHT_YEARLY]: _toYearlyByMonth,
  [CHT_AREA_YEARLY]: _toYearlyByMonth
}, toArea);

const _crSeriaData = (
  data
) => data
  .map(p => [ ymdToUTC(p[0]), p[1] ])
  .sort(compareByDate);

const _toSeria = (
  json,
  option
) => {
  const { value:chartId } = option
  , data = _crSeriaData(getData(json));
  return crSeriaConfig({
      name: chartId.substring(0,12),
      data: data,
      minY: findMinY(data)
  });
};

const NdlAdapter = {
  toConfig(json, option){
     return _getCrConfig(option.seriaType)(json, option);
  },

  toSeries(json, option, chart){
    return _toSeria(json, option, chart);
  }
};

export default NdlAdapter
