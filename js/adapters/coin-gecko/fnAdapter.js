"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};

var _isInRange = function _isInRange(v, min, max) {
  return v > min && v < max;
};

var fnAdapter = {
  crPageConfig: function crPageConfig(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        _items$ = items[0],
        it1 = _items$ === void 0 ? {} : _items$,
        _items$2 = items[1],
        it2 = _items$2 === void 0 ? {} : _items$2,
        _items$3 = items[2],
        it3 = _items$3 === void 0 ? {} : _items$3,
        _page = it1.value,
        page = _isInRange(_page, 0, 11) ? _page : C.DF_PAGE,
        _perPage = it2.value,
        perPage = _isInRange(_perPage, 9, 51) ? _perPage : C.DF_PER_PAGE;
    return [page, perPage, it3.value || C.DF_CURRENCY];
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map