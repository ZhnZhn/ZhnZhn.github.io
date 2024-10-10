"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.valueMoving = exports.toUpperCaseFirst = exports.toTd = exports.toFloatOrEmpty = exports.roundByOHLC = exports.numberFormat = exports.monthIndex = exports.isYNumber = exports.isUndef = exports.isTokenInStr = exports.isNumberOrNull = exports.isNotEmptyArr = exports.isInRange = exports.isInArrStr = exports.getYmdhmUTC = exports.getYear = exports.getValueCaption = exports.getValue = exports.getObjectKeys = exports.getFromDate = exports.getDaysFromYmd = exports.getCurrentYear = exports.getColorBlack = exports.getCaption = exports.getByPropsFrom = exports.findMinY = exports.findMaxY = exports.filterTrimZero = exports.fCrValue = exports.fCrLazyValue = exports.fCheckResponse = exports.fAddToConfigInfoAndDfLink = exports.crZhConfig = exports.crXmlDocument = exports.crValueMoving = exports.crErrorByMessage = exports.crError = exports.crDfLink = exports.crDfItemKey = exports.bindTo = exports.assign = exports.addToConfigInfo = exports.addToConfigDfLink = exports.FN_NOOP = exports.FN_IDENTITY = void 0;
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
var _getByPropsFrom = require("../utils/getByPropsFrom");
exports.getByPropsFrom = _getByPropsFrom.getByPropsFrom;
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
exports.isUndef = _isTypeFn.isUndef;
exports.isTypeNumber = _isTypeFn.isTypeNumber;
exports.isNumber = _isTypeFn.isNumber;
exports.isStr = _isTypeFn.isStr;
exports.isNotEmptyArr = _isTypeFn.isNotEmptyArr;
const isNumberOrNull = v => (0, _isTypeFn.isNumber)(v) || v === null;
exports.isNumberOrNull = isNumberOrNull;
const assign = exports.assign = Object.assign;
const getObjectKeys = obj => (0, _isTypeFn.isObj)(obj) && !(0, _isTypeFn.isArr)(obj) ? Object.keys(obj) : [];
exports.getObjectKeys = getObjectKeys;
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
  return {
    errCaption,
    message: (0, _isTypeFn.isStr)(message) ? message : DF_ERR_MESSAGE
  };
};
exports.crError = crError;
const crErrorByMessage = message => crError('', message);
exports.crErrorByMessage = crErrorByMessage;
const _getDataDf = json => (json || {}).data;
const fCheckResponse = function (getData) {
  if (getData === void 0) {
    getData = _getDataDf;
  }
  return json => {
    if (!(0, _isTypeFn.isArr)(getData(json))) {
      throw crError();
    }
  };
};
exports.fCheckResponse = fCheckResponse;
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
const crZhConfig = (_ref3, configOptions) => {
  let {
    _itemKey,
    itemCaption,
    dataSource
  } = _ref3;
  return {
    ...configOptions,
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
let _parser;
const crXmlDocument = str => {
  if (!_parser) {
    _parser = new window.DOMParser();
  }
  return _parser.parseFromString(str, 'text/xml');
};
exports.crXmlDocument = crXmlDocument;
const addToConfigInfo = (config, option) => {
  config.info = {
    name: (0, _arrFn.joinBy)(", ", option.title, option.subtitle)
  };
};
exports.addToConfigInfo = addToConfigInfo;
const crDfLink = (caption, href) => ({
  linkFn: "DF",
  item: {
    caption,
    href
  }
});
exports.crDfLink = crDfLink;
const addToConfigDfLink = (config, caption, href) => {
  assign(config.zhConfig, crDfLink(caption, href));
};
exports.addToConfigDfLink = addToConfigDfLink;
const fAddToConfigInfoAndDfLink = (title, crDfLink) => (config, json, option) => {
  addToConfigInfo(config, option);
  addToConfigDfLink(config, `${title} Data Portal`, crDfLink(option));
  return config;
};
exports.fAddToConfigInfoAndDfLink = fAddToConfigInfoAndDfLink;
//# sourceMappingURL=AdapterFn.js.map