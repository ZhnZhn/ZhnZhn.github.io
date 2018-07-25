'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
  CAPTION: 'EPS 4Q',
  COLOR: '#4caf50',
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

var _markerColor = function _markerColor(p) {
  return typeof p.EPSSurpriseDollar === 'number' && p.EPSSurpriseDollar < 0 ? C.COLOR_MINUS : C.COLOR_PLUS;
};

var toEarningsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: function crSubtitle(_ref) {
    var value = _ref.value;

    return value + ' ' + C.CAPTION;
  },
  crSeria: function crSeria(json, option) {
    var dfType = option.dfType,
        data = [];


    if (json && Array.isArray(json[dfType])) {
      json[dfType].forEach(function (p) {
        data.push(Object.assign(_ChartConfig2.default.fMarkerExDividend(_markerColor(p), 0), (0, _extends3.default)({
          x: _AdapterFn2.default.ymdToUTC(p.EPSReportDate),
          exValue: p.actualEPS
        }, p)));
      });
    }
    return (0, _ConfigBuilder2.default)().scatterSeria(_Tooltip2.default.eps, { data: data }).toSeria();
  }
};

exports.default = toEarningsImpl;
//# sourceMappingURL=toEarningsImpl.js.map