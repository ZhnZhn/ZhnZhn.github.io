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
var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    toFloatOrEmpty = _AdapterFn["default"].toFloatOrEmpty;
var _isArr = Array.isArray,
    _assign = Object.assign;

var _crPoint = function _crPoint(p) {
  return _assign(_ChartConfig["default"].crMarkerExDividend(C.COLOR, 0), {
    x: ymdToUTC(p.paymentDate),
    exValue: toFloatOrEmpty(p.amount)
  });
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
    var data = _isArr(json) ? json.reverse().map(_crPoint) : [];
    return (0, _ConfigBuilder["default"])().scatterSeria(_Tooltip["default"].exValue, {
      data: data
    }).toSeria();
  }
};
var _default = toDividendsImpl;
exports["default"] = _default;
//# sourceMappingURL=toDividendsImpl.js.map