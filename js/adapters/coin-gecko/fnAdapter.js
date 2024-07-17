"use strict";

exports.__esModule = true;
exports.getYmdhmUTC = exports.crPageConfig = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getYmdhmUTC = _AdapterFn.getYmdhmUTC;
const DF_PAGE = 1,
  DF_PER_PAGE = 10,
  DF_CURRENCY = 'USD';
const crPageConfig = option => {
  const {
      items = []
    } = option,
    _page = (0, _AdapterFn.getValue)(items[0]),
    page = (0, _AdapterFn.isInRange)(_page, 0, 11) ? _page : DF_PAGE,
    _perPage = (0, _AdapterFn.getValue)(items[1]),
    perPage = (0, _AdapterFn.isInRange)(_perPage, 9, 51) ? _perPage : DF_PER_PAGE;
  return [page, perPage, (0, _AdapterFn.getValue)(items[2]) || DF_CURRENCY];
};
exports.crPageConfig = crPageConfig;
//# sourceMappingURL=fnAdapter.js.map