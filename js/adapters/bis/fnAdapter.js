"use strict";

exports.__esModule = true;
exports.getTimePeriod = exports.getSeriesCollection = exports.getRefArea = exports.getObsValue = exports.fCrCategoryName = exports.crItemId = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const _crItemIdDf = _ref => {
  let {
    dfPrefix,
    items,
    seriaType,
    dfSuffix
  } = _ref;
  return (0, _AdapterFn.joinBy)('.', dfPrefix, (0, _CategoryFn.isCategory)(seriaType) ? '*' : (0, _AdapterFn.getValue)(items[0]), (0, _AdapterFn.getValue)(items[1]), dfSuffix);
};
const _crItemId312 = _ref2 => {
  let {
    items,
    seriaType
  } = _ref2;
  return (0, _AdapterFn.joinBy)('.', (0, _AdapterFn.getValue)(items[2]), (0, _CategoryFn.isCategory)(seriaType) ? '*' : (0, _AdapterFn.getValue)(items[0]), (0, _AdapterFn.getValue)(items[1]));
};
const _hmCrItemId = {
  s312: _crItemId312
};
const crItemId = option => (_hmCrItemId[option.dfFn] || _crItemIdDf)(option);
exports.crItemId = crItemId;
const getSeriesCollection = str => (0, _AdapterFn.crXmlDocument)(str).getElementsByTagName('Series') || [];
exports.getSeriesCollection = getSeriesCollection;
const FN_IDENTITY = v => v;
const _fGetAttribute = function (propName, transformValue) {
  if (transformValue === void 0) {
    transformValue = FN_IDENTITY;
  }
  return element => element ? transformValue(element.getAttribute(propName)) : null;
};
const getObsValue = exports.getObsValue = _fGetAttribute("OBS_VALUE", parseFloat);
const getTimePeriod = exports.getTimePeriod = _fGetAttribute("TIME_PERIOD", _AdapterFn.ymdToUTC);
const getRefArea = exports.getRefArea = _fGetAttribute("REF_AREA");
const fCrCategoryName = _ref3 => {
  let {
    dfCategory
  } = _ref3;
  return dfCategory ? _fGetAttribute(dfCategory) : getRefArea;
};
exports.fCrCategoryName = fCrCategoryName;
//# sourceMappingURL=fnAdapter.js.map