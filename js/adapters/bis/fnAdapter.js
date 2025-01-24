"use strict";

exports.__esModule = true;
exports.getTimePeriod = exports.getSeriesCollection = exports.getRefArea = exports.getObsValue = exports.fCrCategoryName = exports.crItemId = void 0;
var _arrFn = require("../../utils/arrFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const _crCategoryToken = function (seriaType, item, numberOfToken) {
    if (numberOfToken === void 0) {
      numberOfToken = 1;
    }
    return (0, _CategoryFn.isCategory)(seriaType) ? numberOfToken === 1 ? "*" : "*.*" : (0, _AdapterFn.getValue)(item);
  },
  _crItemIdDf = _ref => {
    let {
      dfPrefix,
      items,
      seriaType,
      dfSuffix
    } = _ref;
    return (0, _arrFn.joinByDot)(dfPrefix, _crCategoryToken(seriaType, items[0]), (0, _AdapterFn.getValue)(items[1]), dfSuffix);
  },
  _crItemId312 = _ref2 => {
    let {
      items,
      seriaType
    } = _ref2;
    return (0, _arrFn.joinByDot)((0, _AdapterFn.getValue)(items[2]), _crCategoryToken(seriaType, items[0]), (0, _AdapterFn.getValue)(items[1]));
  },
  _crItemId21 = _ref3 => {
    let {
      items,
      seriaType,
      dfSuffix
    } = _ref3;
    return (0, _arrFn.joinByDot)((0, _AdapterFn.getValue)(items[1]), _crCategoryToken(seriaType, items[0], 2), dfSuffix);
  },
  _getCrItemId = (0, _AdapterFn.crGetRoute)({
    s312: _crItemId312,
    s21: _crItemId21
  }, _crItemIdDf);
const crItemId = option => _getCrItemId(option.dfFn)(option);
exports.crItemId = crItemId;
const getSeriesCollection = str => (0, _AdapterFn.crXmlDocument)(str).getElementsByTagName("Series") || [];
exports.getSeriesCollection = getSeriesCollection;
const _fGetAttribute = function (propName, transformValue) {
  if (transformValue === void 0) {
    transformValue = _AdapterFn.FN_IDENTITY;
  }
  return element => element ? transformValue(element.getAttribute(propName)) : null;
};
const getObsValue = exports.getObsValue = _fGetAttribute("OBS_VALUE", parseFloat);
const getTimePeriod = exports.getTimePeriod = _fGetAttribute("TIME_PERIOD", _AdapterFn.ymdToUTC);
const getRefArea = exports.getRefArea = _fGetAttribute("REF_AREA");
const fCrCategoryName = _ref4 => {
  let {
    dfCategory
  } = _ref4;
  return dfCategory ? _fGetAttribute(dfCategory) : getRefArea;
};
exports.fCrCategoryName = fCrCategoryName;
//# sourceMappingURL=fnAdapter.js.map