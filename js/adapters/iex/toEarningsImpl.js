"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

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
    return value + " " + C.CAPTION;
  },
  crSeria: function crSeria(json, option) {
    var dfType = option.dfType,
        data = [];

    if (json && Array.isArray(json[dfType])) {
      json[dfType].forEach(function (p) {
        data.push(Object.assign(_ChartConfig["default"].fMarkerExDividend(_markerColor(p), 0), (0, _extends2["default"])({
          x: _AdapterFn["default"].ymdToUTC(p.EPSReportDate),
          exValue: p.actualEPS
        }, p)));
      });
    }

    return (0, _ConfigBuilder["default"])().scatterSeria(_Tooltip["default"].eps, {
      data: data
    }).toSeria();
  }
};
var _default = toEarningsImpl;
exports["default"] = _default;
//# sourceMappingURL=toEarningsImpl.js.map