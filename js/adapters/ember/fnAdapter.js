"use strict";

exports.__esModule = true;
exports.ymdToUTC = exports.roundBy = exports.reduceToHmBy = exports.isTotalVariable = exports.isTotalData = exports.isCategoryCluster = exports.isCategory = exports.isArr = exports.getValue = exports.getCountryName = exports.getCaption = exports.crError = void 0;
var _CategoryFn = require("../CategoryFn");
exports.isCategory = _CategoryFn.isCategory;
exports.isCategoryCluster = _CategoryFn.isCategoryCluster;
var _AdapterFn = require("../AdapterFn");
exports.isArr = _AdapterFn.isArr;
exports.crError = _AdapterFn.crError;
exports.getCaption = _AdapterFn.getCaption;
exports.getValue = _AdapterFn.getValue;
exports.roundBy = _AdapterFn.roundBy;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
const getCountryName = item => item.country_code ? item.country_or_region || '' : '';
exports.getCountryName = getCountryName;
const SOURCE_TOTAL = 'Total';
const isTotalData = source => source === SOURCE_TOTAL;
exports.isTotalData = isTotalData;
const SOURCE_FOSSIL = 'Fossil',
  SOURCE_CLEAN = 'Clean';
const isTotalVariable = item => item.variable === SOURCE_FOSSIL || item.variable === SOURCE_CLEAN;
exports.isTotalVariable = isTotalVariable;
const reduceToHmBy = (fn, arr) => arr.reduce(fn, Object.create(null));
exports.reduceToHmBy = reduceToHmBy;
//# sourceMappingURL=fnAdapter.js.map