'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow,
    toDateFormatDMYT = _tpFn2.default.toDateFormatDMYT;


var _crValue = function _crValue(_ref) {
  var date = _ref.date,
      id = _ref.id,
      color = _ref.color,
      _ref$valueText = _ref.valueText,
      valueText = _ref$valueText === undefined ? 'Value' : _ref$valueText,
      value = _ref.value;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow(valueText, value, { color: color }) + '\n  </div>';
};

var tpSpline = {
  value: {
    fnTemplate: _crValue,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  },
  valueDmyt: {
    fnTemplate: _crValue,
    fnDateFormat: toDateFormatDMYT,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  }
};

exports.default = tpSpline;
//# sourceMappingURL=tpSpline.js.map