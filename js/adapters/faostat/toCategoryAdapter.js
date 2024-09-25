"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _crData = (json, option) => {
  option.subtitle = (0, _fnAdapter.crCategoryTitle)(option.subtitle, json);
  const _crValue = (0, _AdapterFn.fCrValue)(option);
  return (0, _compareByFn.sortDescCategory)(json.data.reduce((_data, item) => {
    const {
        Value,
        Area
      } = item || {},
      _value = _crValue(parseFloat(Value));
    if ((0, _AdapterFn.isNumber)(_value) && _value !== 0 && Area) {
      _data.push((0, _CategoryFn.crCategoryPoint)(_value, Area));
    }
    return _data;
  }, []));
};
const toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map