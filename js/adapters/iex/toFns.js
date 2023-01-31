"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toStr = exports.toPerc = exports.getValue = exports.crZhConfig = exports.crToSeria = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isTypeNumber = _AdapterFn.isTypeNumber;
exports.getValue = _AdapterFn.getValue;
var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));
const _LOCALE = (navigator || {}).language;
const _assign = Object.assign;
const _calcScatterY = (chart, isMin) => {
  const {
      max,
      min
    } = chart.yAxis[0],
    all = max - min,
    one = all / 100;
  return isMin ? min + one : max - 7 * one;
};
const toStr = n => (0, _AdapterFn.isTypeNumber)(n) ? n.toLocaleString(_LOCALE) : '';
exports.toStr = toStr;
const toPerc = n => (0, _AdapterFn.isTypeNumber)(n) ? n.toLocaleString(_LOCALE, {
  style: 'percent',
  minimumFractionDigits: 2
}) : '';
exports.toPerc = toPerc;
const crZhConfig = _ref => {
  let {
    key,
    value,
    dataSource
  } = _ref;
  return {
    key,
    id: key,
    itemCaption: value || key,
    dataSource
  };
};
exports.crZhConfig = crZhConfig;
const crToSeria = _ref2 => {
  let {
    chart,
    seria,
    caption,
    color,
    option
  } = _ref2;
  const {
      dfType
    } = option,
    y = dfType === _ItemTypes.default.ERN ? _calcScatterY(chart) : _calcScatterY(chart, true);
  seria.data.forEach(p => p.y = y);
  _assign(seria, {
    name: caption,
    itemCaption: caption,
    zhColor: color
  });
  return seria;
};
exports.crToSeria = crToSeria;
//# sourceMappingURL=toFns.js.map