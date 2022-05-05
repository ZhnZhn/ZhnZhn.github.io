"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

const C = {
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};

const _isInRange = (v, min, max) => v > min && v < max;

const fnAdapter = {
  crError: _crFn.crError,
  getYmdhmUTC: _AdapterFn.getYmdhmUTC,
  crPageConfig: option => {
    const {
      items = []
    } = option,
          _page = (0, _AdapterFn.getValue)(items[0]),
          page = _isInRange(_page, 0, 11) ? _page : C.DF_PAGE,
          _perPage = (0, _AdapterFn.getValue)(items[1]),
          perPage = _isInRange(_perPage, 9, 51) ? _perPage : C.DF_PER_PAGE;

    return [page, perPage, (0, _AdapterFn.getValue)(items[2]) || C.DF_CURRENCY];
  }
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map