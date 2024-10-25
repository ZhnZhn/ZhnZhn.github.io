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
      dimension = (0, _AdapterFn.getByPropsFrom)((0, _fnAdapter.getDataDimensions)(data), "series", 0, "values") || [],
      _crValue = (0, _AdapterFn.fCrValue)(option);
    return (0, _compareByFn.sortDescCategory)((0, _AdapterFn.getObjectKeys)(series).reduce((data, itemKey) => {
      const _categoryIndex = parseFloat(itemKey.split(":")[0]),
        categoryValue = (0, _AdapterFn.getByPropsFrom)(series[itemKey], "observations", "0", 0),
        categoryName = (0, _AdapterFn.isNumber)(_categoryIndex) ? (dimension[_categoryIndex] || {}).name : null;
      if ((0, _AdapterFn.isNumber)(categoryValue) && (0, _AdapterFn.isStr)(categoryName)) {
        data.push((0, _CategoryFn.crCategoryPoint)(_crValue(categoryValue), categoryName));
      }
      return data;
    }, []));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map