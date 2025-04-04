import { isInArrStr } from '../utils/arrFn';
import {
  isArr,
  isObj
} from '../utils/isTypeFn';

import {
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_BAR_TREE_MAP,

  CHT_BAR_CLUSTER,
  CHT_BAR_SET,
  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER,

  CHT_DOT_SET
} from '../constants/ChartType';

import {
  FN_IDENTITY,
  domSanitize,
  fCrValue
} from './AdapterFn';

const _getSeriaType = (
  optionOrStr
) => isObj(optionOrStr)
  ? optionOrStr.seriaType
  : optionOrStr
, _fIsSeriaType = (
  isSeriaType
) => (
  optionOrStr
) => isSeriaType(_getSeriaType(optionOrStr));

const TREE_MAP_CHART_TYPES = [
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER
];
export const isTreeMap = _fIsSeriaType(
  isInArrStr(TREE_MAP_CHART_TYPES)
)

const _fIsSeriaTypeEqual = seriaType => (
  optionOrStr
) => _getSeriaType(optionOrStr) === seriaType;

export const isBarTreeMap = _fIsSeriaTypeEqual(CHT_BAR_TREE_MAP)
export const isDotSet = _fIsSeriaTypeEqual(CHT_DOT_SET)

const COLUMN_BAR_CATEGORY_CHART_TYPES = [
  CHT_BAR_CLUSTER,
  CHT_BAR_SET,
  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER
];
export const isColumnOrBarCategory = _fIsSeriaType(
  isInArrStr(COLUMN_BAR_CATEGORY_CHART_TYPES)
)

export const isCategory = (
  optionOrStr
) => isColumnOrBarCategory(optionOrStr)
 || isTreeMap(optionOrStr)

export const isCategoryCluster = (
   seriaType
 ) => (seriaType || '').indexOf('CLUSTER') !== -1

const _addToHm = (
  hm,
  p
) => (hm[p.c] = p, hm);

export const arrangeSeriaByCategories = (
  series,
  categories
) => {
  const _hmPoints = (series.data || [])
    .reduce(_addToHm, {});

  series.data = categories
    .map(category => _hmPoints[category] || null)
  return series;
};

//chart?.xAxis?.[0]?.categories
export const getCategories = (
  chart
) => ((chart.xAxis || [])[0] || {}).categories;

export const isCategoryCase = (
  config,
  categories
) => isArr((config.xAxis||{}).categories)
  && isArr(categories);

export const crCategories = (
  data
) => data.map(item => domSanitize(item.c));

export const crCategoryPoint = (
  y,
  n
) => {
  const c = domSanitize(n);
  return { y, name: c, c };
}

export const fCrTreeMapPoint = (title) => {
  const _title = domSanitize(title);
  return (
    value,
    label
  ) => ({
    value,
    label: domSanitize(label),
    title: _title
  });
}

export const fRoundByIf = (
  option
) => {
  const crValue = fCrValue(option, FN_IDENTITY);
  return crValue === FN_IDENTITY
    ? void 0
    : point => point.y = crValue(point.y)
}

export const roundByDataIf = (
  data,
  option
) => {
  const _roundBy = fRoundByIf(option);
  return _roundBy
    ? (data.forEach(_roundBy), data)
    : data;
}
