"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _objFn = require("../../utils/objFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crDate = (json, option) => {
    const _seriesValues = (0, _objFn.getByPropsFrom)((0, _fnAdapter.getDimensions)(json), "series", (0, _fnAdapter.findCategoryIndex)(option), "values") || [],
      _series = (0, _fnAdapter.getSeries)(json);
    return (0, _compareByFn.sortDescCategory)((0, _isTypeFn.getObjectKeys)(_series).reduce((data, key, index) => {
      const _value = (0, _objFn.getByPropsFrom)(_series[key], "observations", "0", 0),
        _categoryName = (_seriesValues[index] || {}).name;
      if (_value !== null && (0, _isTypeFn.isStr)(_categoryName)) {
        data.push((0, _CategoryFn.crCategoryPoint)(_value, _categoryName));
      }
      return data;
    }, []));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crDate);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map