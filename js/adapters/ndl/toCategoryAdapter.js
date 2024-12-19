"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toCategoryAdapter = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _NdlFn = require("./NdlFn");
const _crData = (json, options) => {
  const data = [];
  (0, _NdlFn.getData)(json, options).forEach(_ref => {
    let [category, value] = _ref;
    if (value > 0) {
      data.push((0, _CategoryFn.crCategoryPoint)(value, category));
    }
  });
  return (0, _compareByFn.sortDescCategory)(data);
};
const toCategoryAdapter = exports.toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
//# sourceMappingURL=toCategoryAdapter.js.map