"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    crError = _AdapterFn["default"].crError,
    crZhConfig = _AdapterFn["default"].crZhConfig,
    joinBy = _AdapterFn["default"].joinBy;

var _joinBy = joinBy.bind(null, ': ');

var fnAdapter = {
  getValue: getValue,
  crError: crError,
  crCaption: function crCaption(option, _ref) {
    var meta = _ref.meta;

    var _ref2 = meta || {},
        exchange = _ref2.exchange,
        symbol = _ref2.symbol,
        type = _ref2.type,
        currency = _ref2.currency;

    return {
      title: _joinBy(exchange, symbol, type, currency)
    };
  },
  crAddConfig: function crAddConfig(_ref3) {
    var option = _ref3.option;
    return {
      zhConfig: crZhConfig(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map