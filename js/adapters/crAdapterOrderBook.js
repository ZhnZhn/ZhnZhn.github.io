"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _toTableFn = require("./toTableFn");

var _crOrderBookRows = _interopRequireDefault(require("./crOrderBookRows"));

const fnNoop = () => {};

const fnIdentity = json => json;

const crAdapterOrderBook = _ref => {
  let {
    crTitle,
    crLimit = fnNoop,
    crOrderBook = fnIdentity
  } = _ref;
  return {
    toConfig(json, option) {
      const {
        _itemKey,
        dataSource
      } = option,
            title = crTitle(option, json),
            _orderBook = crOrderBook(json),
            _limit = crLimit(option),
            [headers, rows] = (0, _crOrderBookRows.default)(_orderBook, _limit),
            config = (0, _toTableFn.crTableConfig)({
        id: _itemKey,
        title,
        headers,
        rows,
        dataSource
      });

      return {
        config
      };
    }

  };
};

var _default = crAdapterOrderBook;
exports.default = _default;
//# sourceMappingURL=crAdapterOrderBook.js.map