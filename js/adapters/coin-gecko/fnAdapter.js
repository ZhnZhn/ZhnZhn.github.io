"use strict";

exports.__esModule = true;
exports.getYmdhmUTC = exports.crPageConfig = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getYmdhmUTC = _AdapterFn.getYmdhmUTC;
var _mathFn = require("../../math/mathFn");
const DF_PAGE = 1,
  DF_PER_PAGE = 10,
  DF_CURRENCY = 'USD';
const crPageConfig = option => {
  const [_page, _perPage, _currency] = (0, _AdapterFn.getValues)(option),
    page = (0, _mathFn.isInRange)(_page, 0, 11) ? _page : DF_PAGE,
    perPage = (0, _mathFn.isInRange)(_perPage, 9, 51) ? _perPage : DF_PER_PAGE;
  return [page, perPage, _currency || DF_CURRENCY];
};
exports.crPageConfig = crPageConfig;
//# sourceMappingURL=fnAdapter.js.map