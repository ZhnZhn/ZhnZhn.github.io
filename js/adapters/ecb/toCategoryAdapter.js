"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _fnAdapter = require("./fnAdapter");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
const crDate = (json, option) => {
    const _seriesCategories = ((((0, _fnAdapter.getDimensions)(json).series || [])[1] || {}).values || []).map(item => (item || {}).name),
      _series = (0, _fnAdapter.getSeries)(json);
    return (0, _compareByFn.sortDescCategory)(Object.keys(_series).map((key, index) => (0, _CategoryFn.crCategoryPoint)((((_series[key] || {}).observations || {})["0"] || [])[0], _seriesCategories[index]))).filter(point => point.y !== null);
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(crDate);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map