"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crData = (json, option) => {
    const data = (0, _fnAdapter.getJsonData)(json),
      series = (0, _fnAdapter.getDataSeries)(data),
      _refAreaIndex = (0, _fnAdapter.getRefAreaIndex)(option),
      dimension = (0, _AdapterFn.getByPropsFrom)((0, _fnAdapter.getDataDimensions)(data), "series", _refAreaIndex, "values") || [],
      _crValue = (0, _AdapterFn.fCrValue)(option),
      _categories = [],
      _data = (0, _AdapterFn.getObjectKeys)(series).reduce((data, itemKey) => {
        const _categoryIndex = parseFloat(itemKey.split(":")[_refAreaIndex]),
          categoryValue = (0, _AdapterFn.getByPropsFrom)(series[itemKey], "observations", "0", 0),
          categoryName = (0, _AdapterFn.isNumber)(_categoryIndex) ? (dimension[_categoryIndex] || {}).name : null;
        if ((0, _AdapterFn.isNumber)(categoryValue) && (0, _AdapterFn.isStr)(categoryName)) {
          data.push((0, _CategoryFn.crCategoryPoint)(_crValue(categoryValue), categoryName));
          _categories.push({
            name: categoryName,
            id: (dimension[_categoryIndex] || {}).id
          });
        }
        return data;
      }, []);
    return (0, _compareByFn.sortDescCategory)(_data);
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map