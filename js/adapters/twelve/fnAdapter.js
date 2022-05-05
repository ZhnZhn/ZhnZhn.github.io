"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

const _joinBy = _AdapterFn.joinBy.bind(null, ': ');

const fnAdapter = {
  getValue: _AdapterFn.getValue,
  crError: _crFn.crError,
  crCaption: (option, _ref) => {
    let {
      meta
    } = _ref;
    const {
      exchange,
      symbol,
      type,
      currency
    } = meta || {};
    return {
      title: _joinBy(exchange, symbol, type, currency)
    };
  },
  crAddConfig: _ref2 => {
    let {
      option
    } = _ref2;
    return {
      zhConfig: (0, _AdapterFn.crZhConfig)(option)
    };
  }
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map