"use strict";

exports.__esModule = true;
exports.ymdToUTC = exports.reduceToHmBy = exports.isUsRoute = exports.isTsRoute = exports.isTreeMapItem = exports.isTotalVariable = exports.isTotalData = exports.getSourceValue = exports.getMetricValue = exports.getMetricCaption = exports.getGeoCaption = exports.fGetCategory = exports.crGetItemLabelValue = exports.crError = exports.crDataImpl = void 0;
var _AdapterFn = require("../AdapterFn");
exports.crError = _AdapterFn.crError;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
var _isTypeFn = require("../../utils/isTypeFn");
var _arrFn = require("../../utils/arrFn");
const isTsRoute = _ref => {
  let {
    dfId
  } = _ref;
  return dfId === "EU" || dfId === "EG" || dfId === "PV";
};
exports.isTsRoute = isTsRoute;
const isUsRoute = option => option.dfId === "US";
exports.isUsRoute = isUsRoute;
const _getCountryOrRegionCategory = item => item.country_code ? item.country_or_region || "" : "";
const _getStateCategory = item => item.country && item.state !== "US Total" ? item.state || "" : "";
const fGetCategory = option => isUsRoute(option) ? _getStateCategory : _getCountryOrRegionCategory;
exports.fGetCategory = fGetCategory;
const _getItems = option => option.items,
  _fGetItemsBy = fn => itemIndex => option => fn(_getItems(option)[itemIndex]),
  _fGetItemsCaptionBy = _fGetItemsBy(_AdapterFn.getCaption),
  _fGetItemsValueBy = _fGetItemsBy(_AdapterFn.getValue);
const getGeoCaption = exports.getGeoCaption = _fGetItemsCaptionBy(0);
const getSourceValue = exports.getSourceValue = _fGetItemsValueBy(1);
const getMetricCaption = exports.getMetricCaption = _fGetItemsCaptionBy(2);
const _getMetricValue = _fGetItemsValueBy(2);
const getMetricValue = options => _getMetricValue(options);
exports.getMetricValue = getMetricValue;
const SOURCE_TOTAL = "Total";
const isTotalData = source => source === SOURCE_TOTAL;
exports.isTotalData = isTotalData;
const SOURCE_FOSSIL = "Fossil",
  SOURCE_CLEAN = "Clean";
const isTotalVariable = item => item.variable === SOURCE_FOSSIL || item.variable === SOURCE_CLEAN;
exports.isTotalVariable = isTotalVariable;
const reduceToHmBy = (fn, arr) => arr.reduce(fn, Object.create(null));
exports.reduceToHmBy = reduceToHmBy;
const crDataImpl = (items, getValue, crDataPoint, isValue) => {
  const _isValue = isValue ? (value, item) => (0, _isTypeFn.isNumber)(value) && isValue(item) : _isTypeFn.isNumber;
  return items.reduce((data, item) => {
    const value = getValue(item);
    if (_isValue(value, item)) {
      data.push(crDataPoint(value, item));
    }
    return data;
  }, []);
};
exports.crDataImpl = crDataImpl;
const _getItemVariable = item => item.variable;
const crGetItemLabelValue = option => {
  const metric = getMetricValue(option),
    getItemValue = item => item[metric];
  return item => (0, _isTypeFn.isObj)(item) ? [_getItemVariable(item), getItemValue(item)] : [];
};
exports.crGetItemLabelValue = crGetItemLabelValue;
const ARR_VARIABLES = ["Coal", "Gas", "Other Fossil", "Nuclear", "Other Renewables", "Bioenergy", "Hydro", "Solar", "Wind"],
  _isLabelFuel = (0, _arrFn.isInArrStr)(ARR_VARIABLES);
const isTreeMapItem = (label, value) => _isLabelFuel(label) && (0, _isTypeFn.isNumber)(value) && value > 0;
exports.isTreeMapItem = isTreeMapItem;
//# sourceMappingURL=fnAdapter.js.map