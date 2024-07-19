"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
const crData = (json, option) => {
  return (0, _compareByFn.sortDescCategory)(json.data.map(item => {
    const point = (0, _CategoryFn.crCategoryPoint)(item[1], item[0]);
    point.color = (0, _fToTreeMapAdapter.crItemColor)(item[0]);
    return point;
  }));
};
const toBarTreeMapAdapter = (0, _crAdapterCategory.default)(crData);
var _default = exports.default = toBarTreeMapAdapter;
//# sourceMappingURL=toBarTreeMapAdapter.js.map