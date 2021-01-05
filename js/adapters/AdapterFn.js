"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _big = _interopRequireDefault(require("big.js"));

var _dateFormat = _interopRequireDefault(require("../charts/dateFormat"));

var _ut = _interopRequireDefault(require("../utils/ut"));

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Type = require("../constants/Type");

var _crFn = _interopRequireDefault(require("./crFn"));

var _pointFn = _interopRequireDefault(require("./pointFn"));

var _legendFn = _interopRequireDefault(require("./legendFn"));

var _toTd = _dateFormat["default"].toTd;
var dt = _ut["default"].dt,
    fCompareBy = _ut["default"].fCompareBy,
    fCompareByTwoProps = _ut["default"].fCompareByTwoProps,
    getC = _ut["default"].getC,
    getV = _ut["default"].getV,
    formatAllNumber = _ut["default"].formatAllNumber;
var findMinY = _seriaFn["default"].findMinY,
    findMaxY = _seriaFn["default"].findMaxY;
var ymdToUTC = dt.ymdToUTC,
    ymdhmsToUTC = dt.ymdhmsToUTC,
    mlsToDmy = dt.mlsToDmy,
    getFromDate = dt.getFromDate,
    getYmdhmUTC = dt.getYmdhmUTC,
    monthIndex = dt.monthIndex;
var EMPTY = '';
var ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType'];

var _isNaN = function _isNaN(n) {
  return typeof n === 'number' && n - n !== 0;
},
    _isArr = Array.isArray,
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _fIsNumber = function _fIsNumber(pn) {
  return function (p) {
    return typeof p[pn] === 'number' && isFinite(p[pn]);
  };
};

var _getDate = function _getDate(point) {
  return _isArr(point) ? point[0] : (point || {}).x;
};

var _getValue = function _getValue(point) {
  return _isArr(point) ? _isNumber(point[1]) ? point[1] : '0.0' : point && _isNumber(point.y) ? point.y : '0.0';
};

var _crBigValueFrom = function _crBigValueFrom(point) {
  return (0, _big["default"])(_getValue(point));
};

var _crDmyFrom = function _crDmyFrom(point) {
  return mlsToDmy(_getDate(point));
};

var _fToFloatOr = function _fToFloatOr(dfValue) {
  return function (str) {
    var _v = parseFloat(str);

    return _isNaN(_v) ? dfValue : _v;
  };
};

var AdapterFn = (0, _extends2["default"])({}, _crFn["default"], _pointFn["default"], _legendFn["default"], {
  toTd: function toTd(mls) {
    return _isNumber(mls) ? _toTd(mls) : '';
  },
  ymdToUTC: ymdToUTC,
  ymdhmsToUTC: ymdhmsToUTC,
  getFromDate: getFromDate,
  getYmdhmUTC: getYmdhmUTC,
  monthIndex: monthIndex,
  getCaption: getC,
  getValue: getV,
  roundBy: _mathFn["default"].roundBy,
  numberFormat: formatAllNumber,
  isNumberOrNull: function isNumberOrNull(v) {
    return _isNumber(v) || v === null;
  },
  isYNumber: _fIsNumber('y'),
  toFloatOrEmpty: _fToFloatOr(''),
  compareByDate: fCompareBy(0),
  compareByY: fCompareBy('y'),
  compareByValue: fCompareBy('value'),
  compareByValueId: fCompareByTwoProps('value', 'id'),
  crValueMoving: function crValueMoving(_ref) {
    var _ref$bNowValue = _ref.bNowValue,
        bNowValue = _ref$bNowValue === void 0 ? (0, _big["default"])('0.0') : _ref$bNowValue,
        _ref$bPrevValue = _ref.bPrevValue,
        bPrevValue = _ref$bPrevValue === void 0 ? (0, _big["default"])('0.0') : _ref$bPrevValue,
        dfR = _ref.dfR;
    return _mathFn["default"].crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: _Type.Direction,
      fnFormat: formatAllNumber,
      dfR: dfR
    });
  },
  valueMoving: function valueMoving(data, dfR) {
    if (!_isArr(data)) {
      return {
        date: data,
        direction: _Type.Direction.EMPTY
      };
    }

    var len = data.length,
        _pointNow = data[len - 1] || [EMPTY, 0],
        bNowValue = _crBigValueFrom(_pointNow),
        _pointPrev = data[len - 2] || _pointNow,
        bPrevValue = _crBigValueFrom(_pointPrev),
        date = _crDmyFrom(_pointNow),
        dateTo = _crDmyFrom(_pointPrev);

    return (0, _extends2["default"])({}, AdapterFn.crValueMoving({
      bNowValue: bNowValue,
      bPrevValue: bPrevValue,
      dfR: dfR
    }), {
      valueTo: formatAllNumber(bPrevValue),
      date: date,
      dateTo: dateTo
    });
  },
  crItemConf: function crItemConf(option) {
    var _itemConf = {};

    var _value;

    ITEM_CONF_PROP_NAMES.forEach(function (k) {
      _value = option[k];

      if (_value != null) {
        _itemConf[k] = _value;
      }
    });
    return _itemConf;
  },
  crValueConf: function crValueConf(data) {
    var _p = data[data.length - 1];
    return {
      x: _getDate(_p),
      y: _getValue(_p)
    };
  },
  joinBy: function joinBy(delimeter) {
    for (var _len = arguments.length, restItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      restItems[_key - 1] = arguments[_key];
    }

    return restItems.filter(Boolean).join(delimeter);
  },
  toUpperCaseFirst: function toUpperCaseFirst(str) {
    return typeof str === 'string' && str.length > 0 ? str[0].toUpperCase() + str.substring(1) : EMPTY;
  },
  findMinY: findMinY,
  findMaxY: findMaxY
});
var _default = AdapterFn;
exports["default"] = _default;
//# sourceMappingURL=AdapterFn.js.map