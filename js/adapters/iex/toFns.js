"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

const _LOCALE = (navigator || {}).language;

const _isNumber = n => typeof n === 'number';

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

const toFns = {
  getValue: _AdapterFn.getValue,
  toStr: n => _isNumber(n) ? n.toLocaleString(_LOCALE) : '',
  toPerc: n => _isNumber(n) ? n.toLocaleString(_LOCALE, {
    style: 'percent',
    minimumFractionDigits: 2
  }) : '',
  crZhConfig: _ref => {
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
  },
  crToSeria: _ref2 => {
    let {
      chart,
      seria,
      caption,
      color,
      option
    } = _ref2;
    const {
      dfType
    } = option;
    const y = dfType === _ItemTypes.default.ERN ? _calcScatterY(chart) : _calcScatterY(chart, true);
    seria.data.forEach(p => p.y = y);

    _assign(seria, {
      name: caption,
      itemCaption: caption,
      zhColor: color
    });

    return seria;
  }
};
var _default = toFns;
exports.default = _default;
//# sourceMappingURL=toFns.js.map