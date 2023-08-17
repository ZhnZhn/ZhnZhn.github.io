"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isCategoryCluster = exports.isCategoryCase = exports.isCategory = exports.getCategories = exports.crCategoryPoint = exports.crCategories = exports.arrangeSeriaByCategories = void 0;
var _domSanitize = _interopRequireDefault(require("../utils/domSanitize"));
const _isArr = Array.isArray;
const isCategory = seriaType => seriaType === "BAR_CLUSTER" || seriaType === "BAR_SET" || seriaType === "COLUMN_SET" || seriaType === "COLUMN_CLUSTER" || seriaType === "TREE_MAP" || seriaType === "TREE_MAP_CLUSTER" || seriaType === "TREE_MAP_2" || seriaType === "TREE_MAP_2_CLUSTER";
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
//# sourceMappingURL=CategoryFn.js.map