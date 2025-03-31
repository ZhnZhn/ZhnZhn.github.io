import {
  FN_IDENTITY,
  isNumber,
  fCrValue,
  getCaption
} from '../AdapterFn';
import routerColumnBarSet from '../stat-json/toColumn';

import FactoryChart from './FactoryChart';
import {
  trJsonToCategory,
  trJsonToSeria
} from './JsonStatFn';
import {
  isNotGeoOrReporter,
  isEuCaption,
  isEuGeoEntity,
  addToCategoryConfig,
  findMinY,
  crCategoryTooltip
} from './EuroStatFn';

const _filterZeroAndRoundByIf = (
  data,
  option
) => {
  const { isFilterZero } = option
  , crValue = fCrValue(option, FN_IDENTITY)
  , _roundValue = point => isNumber(point && point.y)
     ? (point.y = crValue(point.y), point)
     : point
  , _crCategoryPoint = isFilterZero
     ? point => (!point || point.y === 0) ? null : _roundValue(point)
     : _roundValue;
  return _crCategoryPoint === FN_IDENTITY
    ? data
    : data.map(_crCategoryPoint);
};

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
    const { seriaType } = option
    , _crConfig = routerColumnBarSet[seriaType];
    if (!_crConfig) {
      throw new Error(_crRouteIsNotExistMsg(seriaType));
    }
    return _crConfig(json, option);
  }
  const _isAddToCategories = isEuCaption(getCaption(option.items[0]))
    ? isEuGeoEntity
    : void 0;
  return trJsonToCategory(json, _isAddToCategories)
    .then(({ categories, data, min }) => {
      const config = FactoryChart.createConfig(option);
      addToCategoryConfig(config, {
        json,
        option,
        data: _filterZeroAndRoundByIf(data, option),
        categories,
        min
      })
      return config;
    });
}

const _crSeriaData = (
  json,
  option,
  categories
) => {
  const data = trJsonToSeria(
    json,
    categories
  );
  return _filterZeroAndRoundByIf(data, option);
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
     zhMapSlice:configSlice,
     time,
     seriaColor,
     seriaType
  } = option
  , data = _crSeriaData(
     json,
     option,
     categories
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
