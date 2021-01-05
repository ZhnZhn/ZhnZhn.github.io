"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _crOrderBookRows = _interopRequireDefault(require("../crOrderBookRows"));

var crTableConfig = _toTableFn["default"].crTableConfig,
    HEADERS = _crOrderBookRows["default"].HEADERS,
    _crTitle = function _crTitle(_ref) {
  var items = _ref.items;
  return items[0].s;
};

var toOrderBook = {
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        dataSource = option.dataSource,
        title = _crTitle(option),
        _rows = (0, _crOrderBookRows["default"])(json),
        config = crTableConfig({
      id: _itemKey,
      title: title,
      headers: HEADERS,
      rows: _rows,
      dataSource: dataSource
    });

    return {
      config: config
    };
  }
};
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map