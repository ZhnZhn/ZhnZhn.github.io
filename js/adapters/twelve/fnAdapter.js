"use strict";

exports.__esModule = true;
exports.crCaption = void 0;
var _AdapterFn = require("../AdapterFn");
const crCaption = (option, _ref) => {
  let {
    meta
  } = _ref;
  const {
    exchange,
    symbol,
    type,
    currency
  } = meta || {};
  return {
    title: (0, _AdapterFn.joinBy)(": ", exchange, symbol, type, currency)
  };
};
exports.crCaption = crCaption;
//# sourceMappingURL=fnAdapter.js.map