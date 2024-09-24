"use strict";

exports.__esModule = true;
exports.crItemId = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const crItemId = _ref => {
  let {
    dfPrefix,
    items,
    seriaType
  } = _ref;
  return (0, _AdapterFn.joinBy)('.', dfPrefix, (0, _CategoryFn.isCategory)(seriaType) ? '*' : items[0].v, items[1].v);
};
exports.crItemId = crItemId;
//# sourceMappingURL=fnAdapter.js.map