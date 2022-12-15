"use strict";

exports.__esModule = true;
exports.isCategoryCluster = exports.isCategoryCase = exports.isCategory = exports.getCategories = exports.arrangeSeriaByCategories = void 0;
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
}; //chart?.xAxis?.[0]?.categories


exports.arrangeSeriaByCategories = arrangeSeriaByCategories;

const getCategories = chart => ((chart.xAxis || [])[0] || {}).categories;

exports.getCategories = getCategories;

const isCategoryCase = (config, categories) => _isArr((config.xAxis || {}).categories) && _isArr(categories);

exports.isCategoryCase = isCategoryCase;
//# sourceMappingURL=CategoryFn.js.map