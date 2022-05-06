"use strict";

exports.__esModule = true;
exports.getValue = exports.crError = exports.crCaption = exports.crAddConfig = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getValue = _AdapterFn.getValue;

var _crFn = require("../crFn");

exports.crError = _crFn.crError;

const _joinBy = _AdapterFn.joinBy.bind(null, ': ');

const crCaption = (option, _ref) => {
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
};

exports.crCaption = crCaption;

const crAddConfig = _ref2 => {
  let {
    option
  } = _ref2;
  return {
    zhConfig: (0, _AdapterFn.crZhConfig)(option)
  };
};

exports.crAddConfig = crAddConfig;
//# sourceMappingURL=fnAdapter.js.map