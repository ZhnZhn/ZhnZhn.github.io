"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterOrderBook = _interopRequireDefault(require("../crAdapterOrderBook"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var toTd = _AdapterFn["default"].toTd,
    crTitle = function crTitle(_ref, _ref2) {
  var items = _ref.items;
  var timestamp = _ref2.timestamp;
  var strDate = toTd(parseInt(timestamp, 10) * 1000);
  return items[0].c + " " + strDate;
},
    crLimit = function crLimit(_ref3) {
  var items = _ref3.items;
  return parseInt(items[1].v, 10);
};

var toOrderBook = (0, _crAdapterOrderBook["default"])({
  crTitle: crTitle,
  crLimit: crLimit
});
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map