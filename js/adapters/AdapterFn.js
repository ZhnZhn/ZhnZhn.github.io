"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _big = _interopRequireDefault(require("big.js"));

var _DateUtils = _interopRequireDefault(require("../utils/DateUtils"));

var _formatAllNumber = _interopRequireDefault(require("../utils/formatAllNumber"));

var _Type = require("../constants/Type");

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var findMinY = _seriaFn["default"].findMinY,
    findMaxY = _seriaFn["default"].findMaxY;
var ymdToUTC = _DateUtils["default"].ymdToUTC,
    ymdtToUTC = _DateUtils["default"].ymdtToUTC,
    ymdhmsToUTC = _DateUtils["default"].ymdhmsToUTC,
    mlsToDmy = _DateUtils["default"].mlsToDmy,
    getFromDate = _DateUtils["default"].getFromDate;
var EMPTY = '';
var M = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType'];

var _isNaN = Number && Number.isNaN || isNaN;

var _isArr = Array.isArray;

var _fIsNumber = function _fIsNumber(pn) {
  return function (p) {
    return typeof p[pn] === 'number' && isFinite(p[pn]);
  };
};

var _compareArrByIndex = function _compareArrByIndex(index) {
  return function (arrA, arrB) {
    if (arrA[index] < arrB[index]) return -1;else if (arrA[index] === arrB[index]) return 0;else return 1;
  };
};

var _compareByTwoProp = function _compareByTwoProp(propName1, propName2) {
  return function (a, b) {
    if (a[propName1] < b[propName1]) return -1;else if (a[propName1] > b[propName1]) return 1;else if (a[propName2] < b[propName2]) return -1;else if (a[propName2] > a[propName2]) return 1;else return 0;
  };
};

var _getDate = function _getDate(point) {
  return _isArr(point) ? point[0] : point.x;
};

var _getValue = function _getValue(point) {
  if (_isArr(point)) {
    return point[1] != null ? point[1] : '0.0';
  } else {
    return point && point.y != null && !_isNaN(point.y) ? point.y : '0.0';
  }
};

var _fToFloatOr = function _fToFloatOr(dfValue) {
  return function (str) {
    var _v = parseFloat(str);

    return _isNaN(_v) ? dfValue : _v;
  };
};

var AdapterFn = {
  ymdToUTC: ymdToUTC,
  ymdtToUTC: ymdtToUTC,
  ymdhmsToUTC: ymdhmsToUTC,
  getFromDate: getFromDate,
  getCaption: function getCaption(item) {
    var _ref;

    return '' + ((_ref = item && item.caption) != null ? _ref : '');
  },
  getValue: function getValue(item, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        isUpper = _ref2.isUpper,
        _ref2$dfValue = _ref2.dfValue,
        dfValue = _ref2$dfValue === void 0 ? '' : _ref2$dfValue;

    var _ref3 = item != null ? item : {},
        value = _ref3.value,
        inputValue = _ref3.inputValue,
        _value = '' + (value === 'noresult' ? inputValue != null ? inputValue : dfValue : value != null ? value : dfValue);

    return isUpper ? _value.toUpperCase() : _value;
  },
  volumeColumnPoint: function volumeColumnPoint(_ref4) {
    var date = _ref4.date,
        open = _ref4.open,
        close = _ref4.close,
        volume = _ref4.volume,
        option = _ref4.option;

    var _color;

    if (open && close > open) {
      _color = _Color["default"].GREEN;
    } else if (open && close < open) {
      _color = _Color["default"].RED;
    } else {
      _color = _Color["default"].GRAY;
    }

    return Object.assign({
      x: date,
      y: volume,
      color: _color,
      _open: open,
      _close: close
    }, option);
  },
  athPoint: function athPoint(_ref5) {
    var date = _ref5.date,
        prevClose = _ref5.prevClose,
        open = _ref5.open;

    var _bDelta = open && prevClose ? (0, _big["default"])(prevClose).minus(open) : (0, _big["default"])('0.0'),
        _bPercent = prevClose ? _bDelta.times(100).div(prevClose).abs().toFixed(2) : (0, _big["default"])('0.0');

    var _color;

    if (_bDelta.gt(0.0)) {
      _color = _Color["default"].RED;
    } else if (!_bDelta.gte(0.0)) {
      _color = _Color["default"].GREEN;
    } else {
      _color = open ? _Color["default"].GRAY : _Color["default"].WHITE;
    }

    return {
      x: date,
      y: parseFloat(_bPercent),
      close: prevClose,
      open: open ? open : 'Unknown',
      color: _color
    };
  },
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
  formatAllNumber: _formatAllNumber["default"],
  numberFormat: _formatAllNumber["default"],
  isNumberOrNull: function isNumberOrNull(v) {
    return typeof v === 'number' && !isNaN(v) || v === null;
  },
  isYNumber: _fIsNumber('y'),
  toFloatOrNull: _fToFloatOr(null),
  toFloatOrEmpty: _fToFloatOr(''),
  compareByDate: _compareArrByIndex(0),
  compareByY: _compareArrByIndex('y'),
  compareByValue: _compareArrByIndex('value'),
  compareByValueId: _compareByTwoProp('value', 'id'),
  crValueMoving: function crValueMoving(_ref6) {
    var _ref6$bNowValue = _ref6.bNowValue,
        bNowValue = _ref6$bNowValue === void 0 ? (0, _big["default"])('0.0') : _ref6$bNowValue,
        _ref6$bPrevValue = _ref6.bPrevValue,
        bPrevValue = _ref6$bPrevValue === void 0 ? (0, _big["default"])('0.0') : _ref6$bPrevValue,
        dfR = _ref6.dfR;
    return _mathFn["default"].crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: _Type.Direction,
      fnFormat: _formatAllNumber["default"],
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
  crSeria: function crSeria(_ref7) {
    var adapter = _ref7.adapter,
        json = _ref7.json,
        option = _ref7.option,
        type = _ref7.type;

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
    return M.indexOf(String(str).toLowerCase());
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
};
var _default = AdapterFn;
exports["default"] = _default;
//# sourceMappingURL=AdapterFn.js.map