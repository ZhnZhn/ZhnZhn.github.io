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
    timestamp
  } = _ref2;
  const strDate = (0, _AdapterFn.toTd)(parseInt(timestamp, 10) * 1000);
  return items[0].c + " " + strDate;
},
      crLimit = _ref3 => {
  let {
    items
  } = _ref3;
  return parseInt(items[1].v, 10);
};

const toOrderBook = (0, _crAdapterOrderBook.default)({
  crTitle,
  crLimit
});
var _default = toOrderBook;
exports.default = _default;
//# sourceMappingURL=toOrderBook.js.map