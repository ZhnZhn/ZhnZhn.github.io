'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  CAPTION: 'Dividends',
  COLOR: '#4caf50'
};

var toDividendsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: function crSubtitle(_ref) {
    var value = _ref.value,
        dfPeriod = _ref.dfPeriod;

    return value + ' Dividends ' + dfPeriod;
  },

  crSeria: function crSeria(json, option) {
    var data = [];
    if (Array.isArray(json)) {
      json.reverse().forEach(function (p) {
        data.push(Object.assign(_ChartConfig2.default.fMarkerExDividend(C.COLOR, 0), {
          x: _AdapterFn2.default.ymdToUTC(p.paymentDate),
          exValue: p.amount
        }));
      });
    }
    return (0, _ConfigBuilder2.default)().scatterSeria(_Tooltip2.default.exValue, { data: data }).toSeria();
  }
};

exports.default = toDividendsImpl;
//# sourceMappingURL=toDividendsImpl.js.map