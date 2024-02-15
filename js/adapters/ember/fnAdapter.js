"use strict";

exports.__esModule = true;
exports.ymdToUTC = exports.roundBy = exports.reduceToHmBy = exports.isUsRoute = exports.isTreeMap = exports.isTotalVariable = exports.isTotalData = exports.isNumber = exports.isCategory = exports.isArr = exports.getSourceValue = exports.getMetricValue = exports.getMetricCaption = exports.getGeoCaption = exports.fGetCategory = exports.crError = void 0;
var _CategoryFn = require("../CategoryFn");
exports.isTreeMap = _CategoryFn.isTreeMap;
exports.isCategory = _CategoryFn.isCategory;
var _AdapterFn = require("../AdapterFn");
exports.isArr = _AdapterFn.isArr;
exports.isNumber = _AdapterFn.isNumber;
exports.crError = _AdapterFn.crError;
exports.roundBy = _AdapterFn.roundBy;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
const isUsRoute = option => option.dfId === "US";
exports.isUsRoute = isUsRoute;
const _getCountryOrRegionCategory = item => item.country_code ? item.country_or_region || '' : '';
const _getStateCategory = item => item.country && item.state !== "US Total" ? item.state || '' : '';
const fGetCategory = option => isUsRoute(option) ? _getStateCategory : _getCountryOrRegionCategory;
exports.fGetCategory = fGetCategory;
const _getItems = option => option.items,
  _fGetItemsBy = fn => itemIndex => option => fn(_getItems(option)[itemIndex]),
  _fGetItemsCaptionBy = _fGetItemsBy(_AdapterFn.getCaption),
  _fGetItemsValueBy = _fGetItemsBy(_AdapterFn.getValue);
const getGeoCaption = exports.getGeoCaption = _fGetItemsCaptionBy(0);
const getSourceValue = exports.getSourceValue = _fGetItemsValueBy(1);
const getMetricCaption = exports.getMetricCaption = _fGetItemsCaptionBy(2);
const getMetricValue = exports.getMetricValue = _fGetItemsValueBy(2);
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