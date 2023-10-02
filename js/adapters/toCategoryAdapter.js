"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("./CategoryFn");
var _crAdapterCategory = _interopRequireDefault(require("./crAdapterCategory"));
const _crData = json => json.data.map(arrP => (0, _CategoryFn.crCategoryPoint)(arrP[1], arrP[0])),
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map