"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
const _crData = json => json.data.map(arrP => ({
    y: arrP[1],
    name: arrP[0],
    c: arrP[0]
  })),
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = toCategoryAdapter;
exports.default = _default;
//# sourceMappingURL=toCategoryAdapter.js.map