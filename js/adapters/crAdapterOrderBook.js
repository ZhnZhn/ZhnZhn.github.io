"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fCrTitle = exports.default = exports.crTitleDf = exports.crAdapterOrderBook = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _AdapterFn = require("./AdapterFn");
var _toTableFn = require("./toTableFn");
var _crOrderBookRows = _interopRequireDefault(require("./crOrderBookRows"));
const crTitleDf = _ref => {
  let {
    items
  } = _ref;
  return items[0].c;
};
exports.crTitleDf = crTitleDf;
const fCrTitle = (jsonPn, isSeconds) => (option, json) => {
  const _multipleBy = isSeconds ? 1000 : 1,
    strDate = (0, _AdapterFn.toTd)((0, _isTypeFn.parseIntBy10)(json[jsonPn]) * _multipleBy);
  return `${crTitleDf(option)} ${strDate}`;
};
exports.fCrTitle = fCrTitle;
const crAdapterOrderBook = function (_temp) {
  let {
    crTitle = crTitleDf,
    crLimit = _AdapterFn.FN_NOOP,
    crOrderBook = _AdapterFn.FN_IDENTITY
  } = _temp === void 0 ? {} : _temp;
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
exports.crAdapterOrderBook = crAdapterOrderBook;
var _default = exports.default = crAdapterOrderBook;
//# sourceMappingURL=crAdapterOrderBook.js.map