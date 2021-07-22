"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterOrderBook = _interopRequireDefault(require("../crAdapterOrderBook"));

var crTitle = function crTitle(_ref) {
  var items = _ref.items;
  return items[0].s;
};

var toOrderBook = (0, _crAdapterOrderBook["default"])({
  crTitle: crTitle
});
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map