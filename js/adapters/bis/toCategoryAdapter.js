"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crData = (str, option) => {
  const seriesCollection = (0, _fnAdapter.getSeriesCollection)(str),
    seriesCollectionLength = seriesCollection.length,
    data = [],
    _crValue = (0, _AdapterFn.fCrValue)(option),
    _crCategoryName = (0, _fnAdapter.fCrCategoryName)(option);
  let i = 0,
    seriaElement;
  for (; i < seriesCollectionLength; i++) {
    seriaElement = seriesCollection[i];
    data.push((0, _CategoryFn.crCategoryPoint)(_crValue((0, _fnAdapter.getObsValue)(seriaElement.childNodes[0])), _crCategoryName(seriaElement)));
  }
  if (!option.subtitle) {
    option.subtitle = option.dfTitle;
  }
  return (0, _compareByFn.sortDescCategory)(data);
};
const toCategoryAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map