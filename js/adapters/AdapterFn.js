'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var AdapterFn = {
  ymdToUTC: function ymdToUTC(date) {
    var _arr = date.split('-');
    return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _arr[2]);
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
    return [this.legendItem(0, _Color2.default.S_STOCK_CLOSE, 'Close', true), this.legendItem(1, _Color2.default.S_HIGH, 'High'), this.legendItem(2, _Color2.default.S_LOW, 'Low'), this.legendItem(3, _Color2.default.S_OPEN, 'Open')];
  },


  compareByDate: _compareArrByIndex(0),
  compareByY: _compareArrByIndex('y'),
  compareByValue: _compareArrByIndex('value'),
  compareByValueId: _compareByTwoProp('value', 'id')

};

exports.default = AdapterFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\AdapterFn.js.map