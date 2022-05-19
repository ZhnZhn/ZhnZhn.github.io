"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Tooltip = require("../../charts/Tooltip");

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = require("../AdapterFn");

const CAPTION = 'Dividends',
      COLOR_MARKER = '#4caf50',
      _isArr = Array.isArray,
      _assign = Object.assign,
      _crPoint = p => _assign(_ChartConfig.default.crMarkerExDividend(COLOR_MARKER, 0), {
  x: (0, _AdapterFn.ymdToUTC)(p.paymentDate),
  exValue: (0, _AdapterFn.toFloatOrEmpty)(p.amount)
});

const toDividendsImpl = {
  caption: CAPTION,
  color: COLOR_MARKER,
  crSubtitle: _ref => {
    let {
      value,
      dfPeriod
    } = _ref;
    return value + " Dividends " + dfPeriod;
  },
  crSeria: (json, option) => {
    const data = _isArr(json) ? json.reverse().map(_crPoint) : [];
    return (0, _ConfigBuilder.default)().scatterSeria(_Tooltip.tooltipExValue, {
      data
    }).toSeria();
  }
};
var _default = toDividendsImpl;
exports.default = _default;
//# sourceMappingURL=toDividendsImpl.js.map