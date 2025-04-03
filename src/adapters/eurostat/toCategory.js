import {
  findMinY,
  getCaption
} from '../AdapterFn';
import {
  getCategories
} from '../CategoryFn';
import routerColumnBarSet from '../stat-json/toColumn';

import {
  trJsonToCategory,
  trJsonToSeria
} from './JsonStatFn';
import {
  isNotGeoOrReporter,
  isEuCaption,
  isEuGeoEntity,
  crCategoryConfigImpl,
  crCategoryTooltip,
  roundByDataIf
} from './EuroStatFn';

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

const FN_TRUE = () => true;
const _fIsAddToCategories = option => {
  const _isGeoEntity = isEuCaption(getCaption(option.items[0]))
    ? isEuGeoEntity
    : FN_TRUE
  , _isValue = option.isFilterZero
    ? value => value !== 0
    : FN_TRUE;
  return (
    geoEntity,
    value
  ) => _isGeoEntity(geoEntity) && _isValue(value);
};

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
  return trJsonToCategory(json, _fIsAddToCategories(option))
    .then(({ categories, data, min }) => crCategoryConfigImpl({
      json,
      option,
      min,
      data,
      categories
    }));
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
  return roundByDataIf(
    data,
    option
  );
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
  const categories = getCategories(chart)
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
