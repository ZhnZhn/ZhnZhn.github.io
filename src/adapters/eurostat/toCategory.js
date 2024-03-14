import routerColumnBarSet from '../stat-json/toColumn';

import FactoryChart from './FactoryChart';
import {
  trJsonToCategory,
  trJsonToSeria
} from './JsonStatFn';
import {
  isNotGeoOrReporter,
  addToCategoryConfig,
  findMinY,
  crCategoryTooltip
} from './EuroStatFn';

const _filterZeroIf = (
  data,
  isFilter
) => isFilter
  ? data.map(value => value === 0 ? null : value)
  : data;

const _crScatterProps = (
  seriaColor
) => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});

const _crRouteIsNotExistMsg = (
  seriaType
) => `Chart ${seriaType} route isn't exist`

export const crCategoryConfig = (
  json,
  option
) => {
  // By Dim route
  const { dfC } = option;
  if (dfC && isNotGeoOrReporter(dfC)) {
    option.category = dfC
    option.itemSlice = option.zhMapSlice
    const { seriaType } = option
    , _crConfig = routerColumnBarSet[seriaType];
    if (!_crConfig) {
      throw new Error(_crRouteIsNotExistMsg(seriaType));
    }
    return _crConfig(json, option);
  }
  const { zhMapSlice:configSlice } = option;
  return trJsonToCategory(json, configSlice)
    .then(({ categories, data, min }) => {
      const config = FactoryChart.createConfig(option);
      addToCategoryConfig(config, {
        json,
        option,
        data,
        categories,
        min
      })
      return config;
    });
}

const _crSeriaData = (
  json,
  configSlice,
  categories,
  isFilterZero
) => {
  const data = trJsonToSeria(
    json,
    configSlice,
    categories
  );
  return _filterZeroIf(data, isFilterZero);
}

const _crSeriaProps = (
  seriaType,
  seriaColor
) => seriaType === 'DOT_SET'
  ? _crScatterProps(seriaColor)
  : void 0;

export const crCategorySeria = (
  json,
  option,
  chart
) => {
  const categories = chart.options.xAxis[0].categories
  , {
     isFilterZero,
     zhMapSlice:configSlice,
     time,
     seriaColor,
     seriaType
  } = option
  , data = _crSeriaData(
     json,
     configSlice,
     categories,
     isFilterZero
  );

  return {
    data,
    minY: findMinY(data),
    name: configSlice.time || time,
    color: seriaColor,
    tooltip: crCategoryTooltip(),
    ..._crSeriaProps(seriaType, seriaColor)
  };
}
