"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    getYmdhmUTC = _AdapterFn["default"].getYmdhmUTC;
var C = {
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};

var _isInRange = function _isInRange(v, min, max) {
  return v > min && v < max;
};

var fnAdapter = {
  getYmdhmUTC: getYmdhmUTC,
  crPageConfig: function crPageConfig(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        _page = getValue(items[0]),
        page = _isInRange(_page, 0, 11) ? _page : C.DF_PAGE,
        _perPage = getValue(items[1]),
        perPage = _isInRange(_perPage, 9, 51) ? _perPage : C.DF_PER_PAGE;

    return [page, perPage, getValue(items[2]) || C.DF_CURRENCY];
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map