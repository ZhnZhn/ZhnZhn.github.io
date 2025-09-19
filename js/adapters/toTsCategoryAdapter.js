"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toTsCategoryAdapter = exports.crTsCategoryData = void 0;
var _AdapterFn = require("./AdapterFn");
var _CategoryFn = require("./CategoryFn");
var _crAdapterCategory = _interopRequireDefault(require("./crAdapterCategory"));
const crTsCategoryData = (json, option) => {
  const _crValue = (0, _AdapterFn.fCrValue)(option);
  return json.data.map(arrP => (0, _CategoryFn.crCategoryPoint)(_crValue(arrP[1]), arrP[0]));
};
exports.crTsCategoryData = crTsCategoryData;
const toTsCategoryAdapter = exports.toTsCategoryAdapter = (0, _crAdapterCategory.default)(crTsCategoryData);
//# sourceMappingURL=toTsCategoryAdapter.js.map