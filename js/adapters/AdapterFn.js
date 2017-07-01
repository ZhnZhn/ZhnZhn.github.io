'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Colors = require('./Colors');

var _Colors2 = _interopRequireDefault(_Colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdapterFn = {
  ymdToUTC: function ymdToUTC(date) {
    var _arr = date.split('-');
    return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _arr[2]);
  },
  volumeColumnPoint: function volumeColumnPoint(_ref) {
    var date = _ref.date,
        open = _ref.open,
        close = _ref.close,
        volume = _ref.volume,
        option = _ref.option;

    var _color = void 0;
    if (open && close > open) {
      _color = _Colors2.default.COLOR_GREEN;
    } else if (open && close < open) {
      _color = _Colors2.default.COLOR_RED;
    } else {
      _color = _Colors2.default.COLOR_GRAY;
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
      _color = _Colors2.default.COLOR_RED;
    } else if (!_bDelta.gte(0.0)) {
      _color = _Colors2.default.COLOR_GREEN;
    } else {
      _color = open ? _Colors2.default.COLOR_GRAY : _Colors2.default.COLOR_WHITE;
    }

    return {
      x: date,
      y: parseFloat(_bPercent),
      close: prevClose,
      open: open ? open : 'Unknown',
      color: _color
    };
  }
};

exports.default = AdapterFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\AdapterFn.js.map