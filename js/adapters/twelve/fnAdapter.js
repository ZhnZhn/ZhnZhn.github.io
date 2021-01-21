"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    crError = _AdapterFn["default"].crError,
    joinBy = _AdapterFn["default"].joinBy;

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var _joinBy = joinBy.bind(null, ': ');

var fnAdapter = {
  getValue: getValue,
  crError: crError,
  crCaption: function crCaption(option, _ref2) {
    var meta = _ref2.meta;

    var _ref3 = meta || {},
        exchange = _ref3.exchange,
        symbol = _ref3.symbol,
        type = _ref3.type,
        currency = _ref3.currency;

    return {
      title: _joinBy(exchange, symbol, type, currency)
    };
  },
  crAddConfig: function crAddConfig(_ref4) {
    var option = _ref4.option;
    return {
      zhConfig: _crZhConfig(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map