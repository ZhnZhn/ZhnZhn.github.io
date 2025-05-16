"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _crAdapterOrderBook = require("../crAdapterOrderBook");
const toOrderBook = (0, _crAdapterOrderBook.crAdapterOrderBook)({
  crTitle: (0, _crAdapterOrderBook.fCrTitle)("timestamp", true),
  crLimit: _ref => {
    let {
      items
    } = _ref;
    return (0, _isTypeFn.parseIntBy10)(items[1].v);
  }
});
var _default = exports.default = toOrderBook;
//# sourceMappingURL=toOrderBook.js.map