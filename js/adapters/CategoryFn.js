"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isTreeMap = exports.isColumnOrBarCategory = exports.isCategoryCluster = exports.isCategoryCase = exports.isCategory = exports.isBarTreeMap = exports.getCategories = exports.fCrTreeMapPoint = exports.crCategoryPoint = exports.crCategories = exports.arrangeSeriaByCategories = void 0;
var _domSanitize = _interopRequireDefault(require("../utils/domSanitize"));
var _arrFn = require("../utils/arrFn");
var _ChartType = require("../constants/ChartType");
const _isArr = Array.isArray,
  TREE_MAP_CHART_TYPES = [_ChartType.CHT_TREE_MAP, _ChartType.CHT_TREE_MAP_CLUSTER];
const isTreeMap = exports.isTreeMap = (0, _arrFn.isInArrStr)(TREE_MAP_CHART_TYPES);
const isBarTreeMap = seriaType => seriaType === _ChartType.CHT_BAR_TREE_MAP;
exports.isBarTreeMap = isBarTreeMap;
const COLUMN_BAR_CATEGORY_CHART_TYPES = [_ChartType.CHT_BAR_CLUSTER, _ChartType.CHT_BAR_SET, _ChartType.CHT_COLUMN_SET, _ChartType.CHT_COLUMN_CLUSTER];
const isColumnOrBarCategory = exports.isColumnOrBarCategory = (0, _arrFn.isInArrStr)(COLUMN_BAR_CATEGORY_CHART_TYPES);
const isCategory = seriaType => isColumnOrBarCategory(seriaType) || isTreeMap(seriaType);
exports.isCategory = isCategory;
const isCategoryCluster = seriaType => (seriaType || '').indexOf('CLUSTER') !== -1;
exports.isCategoryCluster = isCategoryCluster;
const _addToHm = (hm, p) => (hm[p.c] = p, hm);
const arrangeSeriaByCategories = (series, categories) => {
  const _hmPoints = (series.data || []).reduce(_addToHm, {});
  series.data = categories.map(category => _hmPoints[category] || null);
  return series;
};

//chart?.xAxis?.[0]?.categories
exports.arrangeSeriaByCategories = arrangeSeriaByCategories;
const getCategories = chart => ((chart.xAxis || [])[0] || {}).categories;
exports.getCategories = getCategories;
const isCategoryCase = (config, categories) => _isArr((config.xAxis || {}).categories) && _isArr(categories);
exports.isCategoryCase = isCategoryCase;
const crCategories = data => data.map(item => (0, _domSanitize.default)(item.c));
exports.crCategories = crCategories;
const crCategoryPoint = (y, n) => {
  const c = (0, _domSanitize.default)(n);
  return {
    y,
    name: c,
    c
  };
};
exports.crCategoryPoint = crCategoryPoint;
const fCrTreeMapPoint = title => {
  const _title = (0, _domSanitize.default)(title);
  return (value, label) => ({
    value,
    label: (0, _domSanitize.default)(label),
    title: _title
  });
};
exports.fCrTreeMapPoint = fCrTreeMapPoint;
//# sourceMappingURL=CategoryFn.js.map