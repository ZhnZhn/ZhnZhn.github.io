"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("./toTableFn"));

var _crOrderBookRows = _interopRequireDefault(require("./crOrderBookRows"));

var crTableConfig = _toTableFn["default"].crTableConfig,
    HEADERS = _crOrderBookRows["default"].HEADERS;

var fnNoop = function fnNoop() {};

var fnIdentity = function fnIdentity(json) {
  return json;
};

var crAdapterOrderBook = function crAdapterOrderBook(_ref) {
  var crTitle = _ref.crTitle,
      _ref$crLimit = _ref.crLimit,
      crLimit = _ref$crLimit === void 0 ? fnNoop : _ref$crLimit,
      _ref$crOrderBook = _ref.crOrderBook,
      crOrderBook = _ref$crOrderBook === void 0 ? fnIdentity : _ref$crOrderBook;
  return {
    toConfig: function toConfig(json, option) {
      var _itemKey = option._itemKey,
          dataSource = option.dataSource,
          title = crTitle(option, json),
          _orderBook = crOrderBook(json),
          _limit = crLimit(option),
          rows = (0, _crOrderBookRows["default"])(_orderBook, _limit),
          config = crTableConfig({
        id: _itemKey,
        title: title,
        headers: HEADERS,
        rows: rows,
        dataSource: dataSource
      });

      return {
        config: config
      };
    }
  };
};

var _default = crAdapterOrderBook;
exports["default"] = _default;
//# sourceMappingURL=crAdapterOrderBook.js.map