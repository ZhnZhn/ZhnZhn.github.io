"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crData = (str, option) => {
  const seriesCollection = (0, _fnAdapter.getSeriesCollection)(str),
    data = [],
    _hmCategoryNames = {},
    _crValue = (0, _AdapterFn.fCrValue)(option),
    _crCategoryName = (0, _fnAdapter.fCrCategoryName)(option);
  let seriaElement, _value, _categoryName;
  for (seriaElement of seriesCollection) {
    _value = _crValue((0, _fnAdapter.getObsValue)(seriaElement.childNodes[0]));
    _categoryName = _crCategoryName(seriaElement);
    if ((0, _isTypeFn.isNumber)(_value) && (0, _isTypeFn.isStr)(_categoryName) && !_hmCategoryNames[_categoryName]) {
      data.push((0, _CategoryFn.crCategoryPoint)(_value, _categoryName));
      _hmCategoryNames[_categoryName] = !0;
    }
  }
  if (!option.subtitle) {
    option.subtitle = option.dfTitle;
  }
  return (0, _compareByFn.sortDescCategory)(data);
};
const toCategoryAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map