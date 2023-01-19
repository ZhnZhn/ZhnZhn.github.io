"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.valueMoving = exports.toUpperCaseFirst = exports.toTd = exports.toFloatOrEmpty = exports.roundBy = exports.numberFormat = exports.monthIndex = exports.joinBy = exports.isYNumber = exports.isTypeNumber = exports.isTokenInStr = exports.isNumberOrNull = exports.isNumber = exports.isInArrStr = exports.isArr = exports.getYmdhmUTC = exports.getYear = exports.getValue = exports.getFromDate = exports.getDaysFromYmd = exports.getCurrentYear = exports.getCaption = exports.findMinY = exports.findMaxY = exports.filterTrimZero = exports.crZhConfig = exports.crValueMoving = exports.crError = exports.assign = exports._isNaN = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _dateFormat = require("../charts/dateFormat");
var _arrFn = require("../utils/arrFn");
exports.isInArrStr = _arrFn.isInArrStr;
var _formatAllNumber = _interopRequireDefault(require("../utils/formatAllNumber"));
var _getPropertyFn = require("../utils/getPropertyFn");
var _dateFn = require("../utils/dateFn");
exports.mlsToDmy = _dateFn.mlsToDmy;
exports.ymdToUTC = _dateFn.ymdToUTC;
exports.ymdhmsToUTC = _dateFn.ymdhmsToUTC;
exports.getFromDate = _dateFn.getFromDate;
exports.getYmdhmUTC = _dateFn.getYmdhmUTC;
exports.getYear = _dateFn.getYear;
exports.getCurrentYear = _dateFn.getCurrentYear;
exports.getDaysFromYmd = _dateFn.getDaysFromYmd;
exports.monthIndex = _dateFn.monthIndex;
var _toUpperCaseFirst2 = _interopRequireDefault(require("../utils/toUpperCaseFirst"));
var _mathFn = require("../math/mathFn");
exports.roundBy = _mathFn.roundBy;
var _seriaFn = require("../math/seriaFn");
exports.findMinY = _seriaFn.findMinY;
exports.findMaxY = _seriaFn.findMaxY;
exports.filterTrimZero = _seriaFn.filterTrimZero;
var _DirectionType = require("../constants/DirectionType");
var _getterPointFn = require("./getterPointFn");
const _isNaN = Number.isNaN;
exports._isNaN = _isNaN;
const isArr = Array.isArray;
exports.isArr = isArr;
const isTypeNumber = n => typeof n === 'number';
exports.isTypeNumber = isTypeNumber;
const isNumber = n => isTypeNumber(n) && n - n === 0;
exports.isNumber = isNumber;
const isNumberOrNull = v => isNumber(v) || v === null;
exports.isNumberOrNull = isNumberOrNull;
const assign = Object.assign;
exports.assign = assign;
const EMPTY = '';
const _fIsNumber = pn => p => isTypeNumber(p[pn]) && isFinite(p[pn]);
const _crBigValueFrom = point => (0, _big.default)((0, _getterPointFn.getPointValue)(point));
const _crDmyFrom = point => (0, _dateFn.mlsToDmy)((0, _getterPointFn.getPointDate)(point));
const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};
const isTokenInStr = (str, token) => (str || '').indexOf(token) !== -1;
exports.isTokenInStr = isTokenInStr;
const toTd = mls => isNumber(mls) ? (0, _dateFormat.toTd)(mls) : '';
exports.toTd = toTd;
const getCaption = _getPropertyFn.getC;
exports.getCaption = getCaption;
const getValue = _getPropertyFn.getV;
exports.getValue = getValue;
const numberFormat = _formatAllNumber.default;
exports.numberFormat = numberFormat;
const isYNumber = _fIsNumber('y');
exports.isYNumber = isYNumber;
const toFloatOrEmpty = _fToFloatOr('');
exports.toFloatOrEmpty = toFloatOrEmpty;
const DF_ERR_MESSAGE = 'No data available for request.';
const crError = function (errCaption, message) {
  if (errCaption === void 0) {
    errCaption = '';
  }
  if (message === void 0) {
    message = DF_ERR_MESSAGE;
  }
  return {
    errCaption,
    message
  };
};
exports.crError = crError;
const crValueMoving = _ref => {
  let {
    bNowValue = (0, _big.default)('0.0'),
    bPrevValue = (0, _big.default)('0.0'),
    dfR
  } = _ref;
  return (0, _mathFn.crValueMoving)({
    nowValue: bNowValue,
    prevValue: bPrevValue,
    fnFormat: _formatAllNumber.default,
    dfR
  });
};
exports.crValueMoving = crValueMoving;
const valueMoving = (data, dfR) => {
  if (!isArr(data)) {
    return {
      date: data,
      direction: _DirectionType.DT_EMPTY
    };
  }
  const len = data.length,
    _pointNow = data[len - 1] || [EMPTY, 0],
    bNowValue = _crBigValueFrom(_pointNow),
    _pointPrev = data[len - 2] || _pointNow,
    bPrevValue = _crBigValueFrom(_pointPrev),
    date = _crDmyFrom(_pointNow),
    dateTo = _crDmyFrom(_pointPrev);
  return {
    ...crValueMoving({
      bNowValue,
      bPrevValue,
      dfR
    }),
    valueTo: (0, _formatAllNumber.default)(bPrevValue),
    date,
    dateTo
  };
};
exports.valueMoving = valueMoving;
const joinBy = function (delimeter) {
  for (var _len = arguments.length, restItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restItems[_key - 1] = arguments[_key];
  }
  return restItems.filter(Boolean).join(delimeter);
};
exports.joinBy = joinBy;
const toUpperCaseFirst = _toUpperCaseFirst2.default;
exports.toUpperCaseFirst = toUpperCaseFirst;
const crZhConfig = _ref2 => {
  let {
    _itemKey,
    itemCaption,
    dataSource
  } = _ref2;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource
  };
};
exports.crZhConfig = crZhConfig;
//# sourceMappingURL=AdapterFn.js.map