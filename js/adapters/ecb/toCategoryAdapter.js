"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crDate = (json, option) => {
    const _categoryIndex = (0, _fnAdapter.findCategoryIndex)(option),
      _seriesValues = (((0, _fnAdapter.getDimensions)(json).series || [])[_categoryIndex] || {}).values || [],
      _series = (0, _fnAdapter.getSeries)(json);
    return (0, _compareByFn.sortDescCategory)((0, _AdapterFn.getObjectKeys)(_series).reduce((data, key, index) => {
      const _value = (((_series[key] || {}).observations || {})["0"] || [])[0],
        _categoryName = (_seriesValues[index] || {}).name;
      if (_value !== null && (0, _AdapterFn.isStr)(_categoryName)) {
        data.push((0, _CategoryFn.crCategoryPoint)(_value, _categoryName));
      }
      return data;
    }, []));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crDate);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map