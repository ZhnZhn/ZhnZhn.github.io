"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _isArr = Array.isArray;
const ItemStack = (0, _uiApi.memo)(_ref => {
  let {
    items,
    crItem,
    ...restProps
  } = _ref;
  return _isArr(items) ? items.map((item, index) => crItem(item, index, restProps)) : null;
});
var _default = ItemStack;
exports.default = _default;
//# sourceMappingURL=ItemStack.js.map