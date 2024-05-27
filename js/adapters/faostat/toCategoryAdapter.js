"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
const _crData = (json, option) => json.data.reduce((_data, item) => {
  const _value = parseFloat(item.Value);
  if ((0, _AdapterFn.isNumber)(_value) && item.Area) {
    _data.push((0, _CategoryFn.crCategoryPoint)(parseFloat(item.Value), item.Area));
  }
  return _data;
}, []).sort(_compareByFn.compareByPnY).reverse();
const toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map