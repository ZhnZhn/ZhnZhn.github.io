"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _big = _interopRequireDefault(require("big.js"));

var _ut = _interopRequireDefault(require("../utils/ut"));

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Type = require("../constants/Type");

var _Color = _interopRequireDefault(require("../constants/Color"));

var _crPoint = _interopRequireDefault(require("./crPoint"));

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
    getFromDate = dt.getFromDate;
var EMPTY = '';
var HP_MONTH = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};
var ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType'];

var _isNaN = Number && Number.isNaN || isNaN,
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
  return _isArr(point) ? point[0] : point.x;
};

var _getValue = function _getValue(point) {
  if (_isArr(point)) {
    return _isNumber(point[1]) ? point[1] : '0.0';
  } else {
    return point && _isNumber(point.y) ? point.y : '0.0';
  }
};

var _fToFloatOr = function _fToFloatOr(dfValue) {
  return function (str) {
    var _v = parseFloat(str);

    return _isNaN(_v) ? dfValue : _v;
  };
};

var AdapterFn = (0, _extends2["default"])({}, _crPoint["default"], {
  ymdToUTC: ymdToUTC,
  ymdhmsToUTC: ymdhmsToUTC,
  getFromDate: getFromDate,
  getCaption: getC,
  getValue: getV,
  legendItem: function legendItem(index, color, name, is) {
    if (is === void 0) {
      is = false;
    }

    return {
      index: index,
      color: color,
      name: name,
      isVisible: is
    };
  },
  stockSeriesLegend: function stockSeriesLegend() {
    return [AdapterFn.legendItem(0, _Color["default"].S_STOCK_CLOSE, 'Close', true), AdapterFn.legendItem(1, _Color["default"].S_HIGH, 'High'), AdapterFn.legendItem(2, _Color["default"].S_LOW, 'Low'), AdapterFn.legendItem(3, _Color["default"].S_OPEN, 'Open')];
  },
  roundBy: _mathFn["default"].roundBy,
  numberFormat: formatAllNumber,
  isNumberOrNull: function isNumberOrNull(v) {
    return _isNumber(v) || v === null;
  },
  isYNumber: _fIsNumber('y'),
  toFloatOrNull: _fToFloatOr(null),
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
        direction: 'empty'
      };
    }

    var len = data.length,
        _pointNow = len > 0 && data[len - 1] ? data[len - 1] : [EMPTY, 0],
        _nowValue = _getValue(_pointNow),
        bNowValue = (0, _big["default"])(_nowValue),
        _pointPrev = len > 1 && data[len - 2] ? data[len - 2] : _pointNow,
        _prevValue = _getValue(_pointPrev),
        bPrevValue = (0, _big["default"])(_prevValue),
        _nowDate = _getDate(_pointNow),
        date = len > 0 ? mlsToDmy(_nowDate) : EMPTY,
        _prevDate = _getDate(_pointPrev),
        dateTo = len > 1 && _prevDate ? mlsToDmy(_prevDate) : EMPTY;

    return (0, _extends2["default"])({}, AdapterFn.crValueMoving({
      bNowValue: bNowValue,
      bPrevValue: bPrevValue,
      dfR: dfR
    }), {
      valueTo: AdapterFn.numberFormat(bPrevValue),
      date: date,
      dateTo: dateTo
    });
  },
  crId: function crId() {
    return (Date.now().toString(36) + Math.random().toString(36).substring(2, 9)).toUpperCase();
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
      y: _getValue(_p),
      x: _getDate(_p)
    };
  },
  crSeria: function crSeria(_ref2) {
    var adapter = _ref2.adapter,
        json = _ref2.json,
        option = _ref2.option,
        type = _ref2.type;

    var _adapter$toConfig = adapter.toConfig(json, option),
        config = _adapter$toConfig.config,
        _seria = config.series[0];

    _seria.minY = findMinY(_seria.data);

    if (type) {
      _seria.type = type;
    }

    return _seria;
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
  monthIndex: function monthIndex(str) {
    return HP_MONTH[String(str).toLowerCase()] || -1;
  },
  findMinY: findMinY,
  findMaxY: findMaxY,
  crError: function crError(errCaption, message) {
    if (errCaption === void 0) {
      errCaption = '';
    }

    if (message === void 0) {
      message = '';
    }

    return {
      errCaption: errCaption,
      message: message
    };
  },
  crItemLink: function crItemLink(caption, itemUrl) {
    return "<p>\n    <a href=\"" + itemUrl + "\" style=\"padding-top: 4px;\">" + caption + "</a>\n  </p>";
  }
});
var _default = AdapterFn;
exports["default"] = _default;
//# sourceMappingURL=AdapterFn.js.map