"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterOrderBook = _interopRequireDefault(require("../crAdapterOrderBook"));
var _AdapterFn = require("../AdapterFn");
const crTitle = (_ref, _ref2) => {
  let {
    items
  } = _ref;
  let {
    ts
  } = _ref2;
  const strDate = (0, _AdapterFn.toTd)(parseInt(ts, 10));
  return `${items[0].c} ${strDate}`;
};
const toOrderBook = (0, _crAdapterOrderBook.default)({
  crTitle
});
var _default = exports.default = toOrderBook;
//# sourceMappingURL=toOrderBook.js.map