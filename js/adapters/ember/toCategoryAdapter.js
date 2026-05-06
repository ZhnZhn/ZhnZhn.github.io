"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
const _crData = (json, options) => (0, _toTsCategoryAdapter.crTsCategoryData)(json, options),
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map