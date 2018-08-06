'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow,
    crSpan = _tpFn2.default.crSpan,
    toDateFormatDMYT = _tpFn2.default.toDateFormatDMYT;


var _crVolume = function _crVolume(_ref) {
  var date = _ref.date,
      id = _ref.id,
      value = _ref.value,
      point = _ref.point;

  var _point$_open = point._open,
      _open = _point$_open === undefined ? 'NoData' : _point$_open,
      _point$_close = point._close,
      _close = _point$_close === undefined ? '' : _point$_close,
      _point$_low = point._low,
      _low = _point$_low === undefined ? '' : _point$_low,
      _point$_high = point._high,
      _high = _point$_high === undefined ? '' : _point$_high;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow('Volume', value) + '\n    <div>\n      ' + crSpan('Open', _open) + '\n      ' + crSpan('Close', _close) + '\n    </div>\n    <div>\n      ' + crSpan('Low', _low) + '\n      ' + crSpan('High', _high) + '\n    </div>\n  </div>';
};

var _crAtn = function _crAtn(_ref2) {
  var date = _ref2.date,
      id = _ref2.id,
      value = _ref2.value,
      point = _ref2.point;
  var color = point.color,
      y = point.y,
      close = point.close,
      open = point.open;

  return crHeader(date, id) + '\n    <div class="tp__body">\n      ' + crRow('ATH', y + '%', { color: color }) + '\n      ' + crRow('Prev Close', close) + '\n      ' + crRow('Next Open', open) + '\n    </div>';
};

var _crHl = function _crHl(_ref3) {
  var date = _ref3.date,
      id = _ref3.id,
      value = _ref3.value,
      point = _ref3.point;
  var open = point.open,
      dayHigh = point.dayHigh,
      dayLow = point.dayLow,
      close = point.close;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow('Open', open) + '\n    ' + crRow('High', dayHigh) + '\n    ' + crRow('Low', dayLow) + '\n    ' + crRow('Close', close) + '\n  </div>';
};

var tpStock = {
  volume: {
    fnTemplate: _crVolume,
    isWithValue: true
  },
  volumeDmyt: {
    fnTemplate: _crVolume,
    fnDateFormat: toDateFormatDMYT,
    isWithValue: true
  },
  ath: {
    fnTemplate: _crAtn
  },
  hl: {
    fnTemplate: _crHl
  }
};

exports.default = tpStock;
//# sourceMappingURL=tpStock.js.map