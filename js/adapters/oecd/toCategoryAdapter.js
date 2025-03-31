"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crData = (json, option) => {
    const data = (0, _fnAdapter.getJsonData)(json),
      series = (0, _fnAdapter.getDataSeries)(data),
      dataDimensions = (0, _fnAdapter.getDataDimensions)(data),
      _refAreaIndex = (0, _fnAdapter.getRefAreaIndex)(dataDimensions),
      dimensionValues = (0, _AdapterFn.getByPropsFrom)(dataDimensions, "series", _refAreaIndex, "values") || [],
      _crValue = (0, _AdapterFn.fCrValue)(option),
      _data = (0, _isTypeFn.getObjectKeys)(series).reduce((data, itemKey) => {
        const _categoryIndex = parseFloat(itemKey.split(":")[_refAreaIndex]),
          categoryValue = (0, _AdapterFn.getByPropsFrom)(series[itemKey], "observations", "0", 0),
          categoryName = (0, _isTypeFn.isNumber)(_categoryIndex) ? (dimensionValues[_categoryIndex] || {}).name : null;
        if ((0, _isTypeFn.isNumber)(categoryValue) && (0, _isTypeFn.isStr)(categoryName)) {
          data.push((0, _CategoryFn.crCategoryPoint)(_crValue(categoryValue), categoryName));
        }
        return data;
      }, []);
    return (0, _compareByFn.sortDescCategory)(_data);
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map