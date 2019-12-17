"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

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
    return value + " Dividends " + dfPeriod;
  },
  crSeria: function crSeria(json, option) {
    var data = [];

    if (Array.isArray(json)) {
      json.reverse().forEach(function (p) {
        data.push(Object.assign(_ChartConfig["default"].fMarkerExDividend(C.COLOR, 0), {
          x: _AdapterFn["default"].ymdToUTC(p.paymentDate),
          exValue: p.amount
        }));
      });
    }

    return (0, _ConfigBuilder["default"])().scatterSeria(_Tooltip["default"].exValue, {
      data: data
    }).toSeria();
  }
};
var _default = toDividendsImpl;
exports["default"] = _default;
//# sourceMappingURL=toDividendsImpl.js.map