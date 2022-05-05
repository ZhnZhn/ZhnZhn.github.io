
import {ChartType} from '../../constants/Type';
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
  [ChartType.AREA]: toArea,
  [ChartType.SEMI_DONUT]: toSemiDonut,
  [ChartType.STACKED_AREA]: toStackedArea,
  [ChartType.STACKED_AREA_PERCENT]: toStackedArea,
  [ChartType.STACKED_COLUMN]: toStackedColumn,
  [ChartType.STACKED_COLUMN_PERCENT]: toStackedColumn,
  [ChartType.TREE_MAP]: toTreeMap,
  [ChartType.YEARLY]: _fToConfig(toYearly),
  [ChartType.SCATTER]: _fToConfig(toScatter),
  [ChartType.SCATTER_UP]: _fToConfig(toScatter),
  [ChartType.SCATTER_DOWN]: _fToConfig(toScatter)
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
  [ChartType.SCATTER]: _fToSeria(toScatter),
  [ChartType.SCATTER_UP]: _fToSeria(toScatter),
  [ChartType.SCATTER_DOWN]: _fToSeria(toScatter)
};

const QuandlAdapter = {
  toConfig(json, option){
     const { seriaType=ChartType.AREA } = option;
     return _rToConfig[seriaType](json, option);
  },

  toSeries(json, option, chart){
    const { seriaType } = option
    , _toSeria = _rToSeria[seriaType] || _rToSeria.DF;
    return _toSeria(json, option, chart);
  }
};

export default QuandlAdapter
