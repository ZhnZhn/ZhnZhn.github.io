import {
  CHT_AREA,
  CHT_SEMI_DONUT,
  CHT_STACKED_AREA,
  CHT_STACKED_AREA_PERCENT,
  CHT_STACKED_COLUMN,
  CHT_STACKED_COLUMN_PERCENT,
  CHT_TREE_MAP,
  CHT_YEARLY,
  CHT_SCATTER,
  CHT_SCATTER_UP,
  CHT_SCATTER_DOWN
} from '../../constants/ChartType';
import ChartConfig from '../../charts/ChartConfig';

import { ymdToUTC, findMinY } from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import QuandlFn from './QuandlFn';

import toArea from './toArea';
import toSemiDonut from './toSemiDonut';
import toStackedArea  from './toStackedArea';
import toStackedColumn from './toStackedColumn';
import toTreeMap from './toTreeMap';
import toYearly from '../toYearsByMonths';
import toScatter from './toScatter';

const {
  getData,
  getDataColumnIndex
} = QuandlFn;

const _fToConfig = builder => (json, option) => {
  const data = getData(json);
  return { config: builder.toConfig(data, option) };
};
const _fToSeria = builder => (json, option, chart) => {
  const data = getData(json);
  return builder.toSeria(data, option, chart);
};

const _rToConfig = {
  [CHT_AREA]: toArea,
  [CHT_SEMI_DONUT]: toSemiDonut,
  [CHT_STACKED_AREA]: toStackedArea,
  [CHT_STACKED_AREA_PERCENT]: toStackedArea,
  [CHT_STACKED_COLUMN]: toStackedColumn,
  [CHT_STACKED_COLUMN_PERCENT]: toStackedColumn,
  [CHT_TREE_MAP]: toTreeMap,
  [CHT_YEARLY]: _fToConfig(toYearly),
  [CHT_SCATTER]: _fToConfig(toScatter),
  [CHT_SCATTER_UP]: _fToConfig(toScatter),
  [CHT_SCATTER_DOWN]: _fToConfig(toScatter)
};

const _crSeriaData = (data, yIndex) => {
  return data
    .map(p => [ ymdToUTC(p[0]), p[yIndex] ])
    .sort(compareByDate);
};

const _toSeria = (json, option) => {
  const { value:chartId } = option
  , yPointIndex = getDataColumnIndex(json, option)
  , data = _crSeriaData(getData(json), yPointIndex);
  return ChartConfig.crSeria({
      name : chartId.substring(0,12),
      data : data,
      minY : findMinY(data)
  });
};

const _rToSeria = {
  DF: _toSeria,
  [CHT_SCATTER]: _fToSeria(toScatter),
  [CHT_SCATTER_UP]: _fToSeria(toScatter),
  [CHT_SCATTER_DOWN]: _fToSeria(toScatter)
};

const QuandlAdapter = {
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

export default QuandlAdapter
