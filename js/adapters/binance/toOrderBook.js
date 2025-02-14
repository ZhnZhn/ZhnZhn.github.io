"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterOrderBook = require("../crAdapterOrderBook");
const crTitle = _ref => {
  let {
    items
  } = _ref;
  return items[0].v;
};
const toOrderBook = (0, _crAdapterOrderBook.crAdapterOrderBook)({
  crTitle
});
var _default = exports.default = toOrderBook;
//# sourceMappingURL=toOrderBook.js.map