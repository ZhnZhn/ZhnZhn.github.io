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
var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    toFloatOrEmpty = _AdapterFn["default"].toFloatOrEmpty;
var _isArr = Array.isArray;
var _assign = Object.assign;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _markerColor = function _markerColor(p) {
  return _isNumber(p.EPSSurpriseDollar) && p.EPSSurpriseDollar < 0 ? C.COLOR_MINUS : C.COLOR_PLUS;
};

var _crPoint = function _crPoint(p) {
  return _assign(_ChartConfig["default"].crMarkerExDividend(_markerColor(p), 0), (0, _extends2["default"])({
    x: ymdToUTC(p.EPSReportDate),
    exValue: toFloatOrEmpty(p.actualEPS)
  }, p));
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
        _jsonData = json && json[dfType],
        data = _isArr(_jsonData) ? _jsonData.map(_crPoint) : [];

    return (0, _ConfigBuilder["default"])().scatterSeria(_Tooltip["default"].eps, {
      data: data
    }).toSeria();
  }
};
var _default = toEarningsImpl;
exports["default"] = _default;
//# sourceMappingURL=toEarningsImpl.js.map