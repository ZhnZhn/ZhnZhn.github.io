"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterOrderBook = require("../crAdapterOrderBook");
const toOrderBook = (0, _crAdapterOrderBook.crAdapterOrderBook)({
  crTitle: (0, _crAdapterOrderBook.fCrTitle)("timestamp", true),
  crLimit: _ref => {
    let {
      items
    } = _ref;
    return parseInt(items[1].v, 10);
  }
});
var _default = exports.default = toOrderBook;
//# sourceMappingURL=toOrderBook.js.map