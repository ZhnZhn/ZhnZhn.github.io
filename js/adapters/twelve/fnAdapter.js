"use strict";

exports.__esModule = true;
exports.crCaption = void 0;
var _arrFn = require("../../utils/arrFn");
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
    title: (0, _arrFn.joinByColon)(exchange, symbol, type, currency)
  };
};
exports.crCaption = crCaption;
//# sourceMappingURL=fnAdapter.js.map