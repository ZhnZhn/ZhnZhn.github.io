"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.valueMoving = exports.toUpperCaseFirst = exports.toTd = exports.toFloatOrEmpty = exports.roundByOHLC = exports.numberFormat = exports.monthIndex = exports.joinBy = exports.isYNumber = exports.isTypeNumber = exports.isTokenInStr = exports.isNumberOrNull = exports.isNumber = exports.isInArrStr = exports.isArr = exports.getYmdhmUTC = exports.getYear = exports.getValueCaption = exports.getValue = exports.getFromDate = exports.getDaysFromYmd = exports.getCurrentYear = exports.getColorBlack = exports.getCaption = exports.findMinY = exports.findMaxY = exports.filterTrimZero = exports.fCrValue = exports.crZhConfig = exports.crValueMoving = exports.crError = exports.crDfItemKey = exports.assign = exports._isNaN = exports.FN_NOOP = exports.FN_IDENTITY = void 0;
var _styleFn = require("../components/styleFn");
exports.getColorBlack = _styleFn.getColorBlack;
var _big = _interopRequireDefault(require("big.js"));
var _dateFormat = require("../charts/dateFormat");
var _isTokenInStr = require("../utils/isTokenInStr");
exports.isTokenInStr = _isTokenInStr.isTokenInStr;
var _arrFn = require("../utils/arrFn");
exports.isInArrStr = _arrFn.isInArrStr;
exports.joinBy = _arrFn.joinBy;
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
const _isNaN = exports._isNaN = Number.isNaN;
const isArr = exports.isArr = Array.isArray;
const isTypeNumber = n => typeof n === 'number';
exports.isTypeNumber = isTypeNumber;
const isNumber = n => isTypeNumber(n) && n - n === 0;
exports.isNumber = isNumber;
const isNumberOrNull = v => isNumber(v) || v === null;
exports.isNumberOrNull = isNumberOrNull;
const assign = exports.assign = Object.assign;
const FN_IDENTITY = v => v;
exports.FN_IDENTITY = FN_IDENTITY;
const FN_NOOP = () => {};
exports.FN_NOOP = FN_NOOP;
const crDfItemKey = _ref => {
  let {
    _itemKey
  } = _ref;
  return _itemKey;
};
exports.crDfItemKey = crDfItemKey;
const EMPTY = '';
const _fIsNumber = pn => p => isTypeNumber(p[pn]) && isFinite(p[pn]);
const _crBigValueFrom = point => (0, _big.default)((0, _getterPointFn.getPointValue)(point));
const _crDmyFrom = point => (0, _dateFn.mlsToDmy)((0, _getterPointFn.getPointDate)(point));
const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};
const toTd = mls => isNumber(mls) ? (0, _dateFormat.toTd)(mls) : '';
exports.toTd = toTd;
const getCaption = exports.getCaption = _getPropertyFn.getC;
const getValue = exports.getValue = _getPropertyFn.getV;
const getValueCaption = exports.getValueCaption = _getPropertyFn.getVc;
const numberFormat = exports.numberFormat = _formatAllNumber.default;
const isYNumber = exports.isYNumber = _fIsNumber('y');
const toFloatOrEmpty = exports.toFloatOrEmpty = _fToFloatOr('');
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
const crValueMoving = _ref2 => {
  let {
    bNowValue = (0, _big.default)('0.0'),
    bPrevValue = (0, _big.default)('0.0'),
    dfR
  } = _ref2;
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
const fCrValue = option => {
  const _rt = option._rt;
  return isNumber(_rt) ? v => (0, _mathFn.roundBy)(v, _rt) : v => v;
};
exports.fCrValue = fCrValue;
const roundByOHLC = n => {
  if (n > -1 && n < 1) {
    return n;
  }
  return (0, _mathFn.roundBy)(n, 2);
};
exports.roundByOHLC = roundByOHLC;
const toUpperCaseFirst = exports.toUpperCaseFirst = _toUpperCaseFirst2.default;
const crZhConfig = _ref3 => {
  let {
    _itemKey,
    itemCaption,
    dataSource
  } = _ref3;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource
  };
};
exports.crZhConfig = crZhConfig;
//# sourceMappingURL=AdapterFn.js.map