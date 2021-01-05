"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _crOrderBookRows = _interopRequireDefault(require("../crOrderBookRows"));

var toTd = _AdapterFn["default"].toTd,
    crTableConfig = _toTableFn["default"].crTableConfig,
    HEADERS = _crOrderBookRows["default"].HEADERS,
    _crLimit = function _crLimit(_ref) {
  var items = _ref.items;
  return parseInt(items[1].v, 10);
},
    _crTitle = function _crTitle(_ref2, _ref3) {
  var timestamp = _ref2.timestamp;
  var items = _ref3.items;
  var strDate = toTd(parseInt(timestamp, 10) * 1000);
  return items[0].c + " " + strDate;
};

var toOrderBook = {
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        dataSource = option.dataSource,
        title = _crTitle(json, option),
        limit = _crLimit(option),
        rows = (0, _crOrderBookRows["default"])(json, limit),
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
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map