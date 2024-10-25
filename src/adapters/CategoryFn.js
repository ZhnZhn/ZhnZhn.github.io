import domSanitize from '../utils/domSanitize';
import { isInArrStr } from '../utils/arrFn';
import {
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_BAR_TREE_MAP,

  CHT_BAR_CLUSTER,
  CHT_BAR_SET,
  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER
} from '../constants/ChartType';

const _isArr = Array.isArray
, TREE_MAP_CHART_TYPES = [
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER
];
export const isTreeMap = isInArrStr(TREE_MAP_CHART_TYPES)
export const isBarTreeMap = seriaType => seriaType === CHT_BAR_TREE_MAP

const COLUMN_BAR_CATEGORY_CHART_TYPES = [
  CHT_BAR_CLUSTER,
  CHT_BAR_SET,
  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER
]
export const isColumnOrBarCategory = isInArrStr(COLUMN_BAR_CATEGORY_CHART_TYPES)

export const isCategory = (
  seriaType
) => isColumnOrBarCategory(seriaType)
 || isTreeMap(seriaType)
export const isCategorySeriaType = ({
  seriaType
}) => isCategory(seriaType)

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
) => _isArr((config.xAxis||{}).categories)
  && _isArr(categories);

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
