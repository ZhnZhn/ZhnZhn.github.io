"use strict";

exports.__esModule = true;
exports.getYmdhmUTC = exports.crPageConfig = exports.crItemLink = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getYmdhmUTC = _AdapterFn.getYmdhmUTC;

var _crFn = require("../crFn");

exports.crItemLink = _crFn.crItemLink;
const DF_PAGE = 1,
      DF_PER_PAGE = 10,
      DF_CURRENCY = 'USD';

const _isInRange = (v, min, max) => v > min && v < max;

const crPageConfig = option => {
  const {
    items = []
  } = option,
        _page = (0, _AdapterFn.getValue)(items[0]),
        page = _isInRange(_page, 0, 11) ? _page : DF_PAGE,
        _perPage = (0, _AdapterFn.getValue)(items[1]),
        perPage = _isInRange(_perPage, 9, 51) ? _perPage : DF_PER_PAGE;

  return [page, perPage, (0, _AdapterFn.getValue)(items[2]) || DF_CURRENCY];
};

exports.crPageConfig = crPageConfig;
//# sourceMappingURL=fnAdapter.js.map