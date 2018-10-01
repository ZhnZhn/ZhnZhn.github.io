'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _formatAllNumber = require('../utils/formatAllNumber');

var _formatAllNumber2 = _interopRequireDefault(_formatAllNumber);

var _Type = require('../constants/Type');

var _mathFn = require('../math/mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

var _IndicatorSma = require('./IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import ChartConfig from '../charts/ChartConfig';
var EMPTY = '';
var M = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

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
  return Array.isArray(point) ? point[0] : point.x;
};
var _getValue = function _getValue(point) {
  if (Array.isArray(point)) {
    return point[1] != null ? point[1] : '0.0';
  } else {
    return point && point.y != null ? point.y : '0.0';
  }
};

var AdapterFn = {
  ymdToUTC: function ymdToUTC(date) {
    var _arr = date.split('-'),
        _len = _arr.length;
    if (_len === 3) {
      return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _arr[2]);
    } else if (_len === 2 && _arr[1] !== '') {
      var _m = parseInt(_arr[1], 10),
          _d = new Date(_arr[0], _m, 0).getDate();
      return Date.UTC(_arr[0], _m - 1, _d);
    } else if (_len === 1) {
      return Date.UTC(_arr[0], 11, 31);
    }
  },
  ymdtToUTC: function ymdtToUTC(date) {
    var _arr = date.split('-'),
        _d = _arr[2].split(' ')[0];
    return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _d);
  },
  ymdhmsToUTC: function ymdhmsToUTC(date) {
    var _dtArr = date.split(' '),
        _ymdArr = _dtArr[0].split('-'),
        _hmsArr = _dtArr[1].split(':');
    return Date.UTC(_ymdArr[0], parseInt(_ymdArr[1], 10) - 1, _ymdArr[2], _hmsArr[0], _hmsArr[1], _hmsArr[2]);
  },
  volumeColumnPoint: function volumeColumnPoint(_ref) {
    var date = _ref.date,
        open = _ref.open,
        close = _ref.close,
        volume = _ref.volume,
        option = _ref.option;

    var _color = void 0;
    if (open && close > open) {
      _color = _Color2.default.GREEN;
    } else if (open && close < open) {
      _color = _Color2.default.RED;
    } else {
      _color = _Color2.default.GRAY;
    }

    return Object.assign({
      x: date, y: volume, color: _color,
      _open: open, _close: close
    }, option);
  },
  athPoint: function athPoint(_ref2) {
    var date = _ref2.date,
        prevClose = _ref2.prevClose,
        open = _ref2.open;

    var _bDelta = open && prevClose ? (0, _big2.default)(prevClose).minus(open) : (0, _big2.default)('0.0'),
        _bPercent = prevClose ? _bDelta.times(100).div(prevClose).abs().toFixed(2) : (0, _big2.default)('0.0');

    var _color = void 0;
    if (_bDelta.gt(0.0)) {
      _color = _Color2.default.RED;
    } else if (!_bDelta.gte(0.0)) {
      _color = _Color2.default.GREEN;
    } else {
      _color = open ? _Color2.default.GRAY : _Color2.default.WHITE;
    }

    return {
      x: date,
      y: parseFloat(_bPercent),
      close: prevClose,
      open: open ? open : 'Unknown',
      color: _color
    };
  },
  legendItem: function legendItem(index, color, name) {
    var is = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return {
      index: index, color: color, name: name,
      isVisible: is
    };
  },
  stockSeriesLegend: function stockSeriesLegend() {
    return [AdapterFn.legendItem(0, _Color2.default.S_STOCK_CLOSE, 'Close', true), AdapterFn.legendItem(1, _Color2.default.S_HIGH, 'High'), AdapterFn.legendItem(2, _Color2.default.S_LOW, 'Low'), AdapterFn.legendItem(3, _Color2.default.S_OPEN, 'Open')];
  },


  formatAllNumber: _formatAllNumber2.default,
  numberFormat: _formatAllNumber2.default,
  /*
  numberFormat(value){
    return ChartConfig.fnNumberFormat(value);
  },
  */

  isNumberOrNull: function isNumberOrNull(v) {
    return typeof v === 'number' && !isNaN(v) || v === null;
  },

  isYNumber: _fIsNumber('y'),

  compareByDate: _compareArrByIndex(0),
  compareByY: _compareArrByIndex('y'),
  compareByValue: _compareArrByIndex('value'),
  compareByValueId: _compareByTwoProp('value', 'id'),

  crValueMoving: function crValueMoving(_ref3) {
    var _ref3$bNowValue = _ref3.bNowValue,
        bNowValue = _ref3$bNowValue === undefined ? (0, _big2.default)('0.0') : _ref3$bNowValue,
        _ref3$bPrevValue = _ref3.bPrevValue,
        bPrevValue = _ref3$bPrevValue === undefined ? (0, _big2.default)('0.0') : _ref3$bPrevValue;

    return _mathFn2.default.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: _Type.Direction,
      fnFormat: _formatAllNumber2.default
      //fnFormat: ChartConfig.fnNumberFormat
    });
  },
  valueMoving: function valueMoving(data) {
    if (!Array.isArray(data)) {
      return { date: data, direction: 'empty' };
    }

    var len = data.length,
        _pointNow = len > 0 && data[len - 1] ? data[len - 1] : [EMPTY, 0],
        _nowValue = _getValue(_pointNow),
        bNowValue = (0, _big2.default)(_nowValue),
        _pointPrev = len > 1 && data[len - 2] ? data[len - 2] : _pointNow,
        _prevValue = _getValue(_pointPrev),
        bPrevValue = (0, _big2.default)(_prevValue),
        _nowDate = _getDate(_pointNow),
        date = len > 0 ? _DateUtils2.default.formatTo(_nowDate) : EMPTY,
        _prevDate = _getDate(_pointPrev),
        dateTo = len > 1 && _prevDate ? _DateUtils2.default.formatTo(_prevDate) : EMPTY;

    return (0, _extends3.default)({}, AdapterFn.crValueMoving({ bNowValue: bNowValue, bPrevValue: bPrevValue }), {
      valueTo: AdapterFn.numberFormat(bPrevValue),
      date: date, dateTo: dateTo
    });
  },


  crId: function crId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
  },

  crZhFn: function crZhFn() {
    return {
      zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
      zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
    };
  },
  fnGetConfigMfi: _IndicatorSma.fnGetConfigMfi,

  toUpperCaseFirst: function toUpperCaseFirst(str) {
    return (typeof str === 'string' || str instanceof String) && str.length > 0 ? str[0].toUpperCase() + str.substr(1) : EMPTY;
  },
  appendWithColon: function appendWithColon() {
    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    var str = '';
    args.forEach(function (s) {
      if (s) {
        str = str ? str + ': ' + s : s;
      }
    });
    return str;
  },

  monthIndex: function monthIndex(str) {
    return M.indexOf(String(str).toLowerCase());
  },

  findMinY: function findMinY(data) {
    if (!Array.isArray(data) || data.length < 1) {
      return undefined;
    }
    var minY = Number.POSITIVE_INFINITY;
    var _fn = typeof data[0].y === 'number' ? function (p, min) {
      return p.y < min ? p.y : min;
    } : function (arr, min) {
      return arr[1] < min ? arr[1] : min;
    };
    for (var i = 0, max = data.length; i < max; i++) {
      minY = _fn(data[i], minY);
    }
    return minY !== Number.POSITIVE_INFINITY ? minY.toFixed(4) : undefined;
  },
  findMaxY: function findMaxY(data) {
    if (!Array.isArray(data) || data.length < 1) {
      return undefined;
    }
    var maxY = Number.NEGATIVE_INFINITY;
    var _fn = typeof data[0].y === 'number' ? function (p, max) {
      return p.y > max ? p.y : max;
    } : function (arr, max) {
      return arr[1] > max ? arr[1] : max;
    };
    for (var i = 0, max = data.length; i < max; i++) {
      maxY = _fn(data[i], maxY);
    }
    return maxY !== Number.NEGATIVE_INFINITY ? maxY.toFixed(4) : undefined;
  }

};

exports.default = AdapterFn;
//# sourceMappingURL=AdapterFn.js.map