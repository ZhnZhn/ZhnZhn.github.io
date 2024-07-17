"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.valueMoving = exports.toUpperCaseFirst = exports.toTd = exports.toFloatOrEmpty = exports.roundByOHLC = exports.numberFormat = exports.monthIndex = exports.joinBy = exports.isYNumber = exports.isTokenInStr = exports.isStr = exports.isObj = exports.isNumberOrNull = exports.isInRange = exports.isInArrStr = exports.getYmdhmUTC = exports.getYear = exports.getValueCaption = exports.getValue = exports.getFromDate = exports.getDaysFromYmd = exports.getCurrentYear = exports.getColorBlack = exports.getCaption = exports.findMinY = exports.findMaxY = exports.filterTrimZero = exports.fCrValue = exports.fCrLazyValue = exports.crZhConfig = exports.crValueMoving = exports.crError = exports.crDfItemKey = exports.bindTo = exports.assign = exports.FN_NOOP = exports.FN_IDENTITY = void 0;
var _styleFn = require("../components/styleFn");
exports.getColorBlack = _styleFn.getColorBlack;
var _big = _interopRequireDefault(require("big.js"));
var _dateFormat = require("../charts/dateFormat");
var _bindTo = require("../utils/bindTo");
exports.bindTo = _bindTo.bindTo;
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
var _toUpperCaseFirst = require("../utils/toUpperCaseFirst");
exports.toUpperCaseFirst = _toUpperCaseFirst.toUpperCaseFirst;
var _mathFn = require("../math/mathFn");
exports.roundBy = _mathFn.roundBy;
exports.isInRange = _mathFn.isInRange;
var _seriaFn = require("../math/seriaFn");
exports.findMinY = _seriaFn.findMinY;
exports.findMaxY = _seriaFn.findMaxY;
exports.filterTrimZero = _seriaFn.filterTrimZero;
var _DirectionType = require("../constants/DirectionType");
var _getterPointFn = require("./getterPointFn");
var _isTypeFn = require("../utils/isTypeFn");
exports.isObj = _isTypeFn.isObj;
exports.isArr = _isTypeFn.isArr;
exports.isNaN = _isTypeFn.isNaN;
exports.isTypeNumber = _isTypeFn.isTypeNumber;
exports.isNumber = _isTypeFn.isNumber;
exports.isStr = _isTypeFn.isStr;
const isNumberOrNull = v => (0, _isTypeFn.isNumber)(v) || v === null;
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
const _fIsNumber = pn => p => (0, _isTypeFn.isTypeNumber)(p[pn]) && isFinite(p[pn]);
const _crBigValueFrom = point => (0, _big.default)((0, _getterPointFn.getPointValue)(point));
const _crDmyFrom = point => (0, _dateFn.mlsToDmy)((0, _getterPointFn.getPointDate)(point));
const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return (0, _isTypeFn.isNaN)(_v) ? dfValue : _v;
};
const toTd = mls => (0, _isTypeFn.isNumber)(mls) ? (0, _dateFormat.toTd)(mls) : '';
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
  if (!(0, _isTypeFn.isArr)(data)) {
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
const fCrValue = (option, crValueDf) => {
  const _rt = option._rt;
  return (0, _isTypeFn.isNumber)(_rt) ? v => (0, _mathFn.roundBy)(v, _rt) : crValueDf || (v => v);
};
exports.fCrValue = fCrValue;
const roundByOHLC = n => {
  if (n > -1 && n < 1) {
    return n;
  }
  return (0, _mathFn.roundBy)(n, 2);
};
exports.roundByOHLC = roundByOHLC;
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
const fCrLazyValue = crValue => {
  let value;
  return () => value === void 0 ? value = crValue() : value;
};
exports.fCrLazyValue = fCrLazyValue;
//# sourceMappingURL=AdapterFn.js.map