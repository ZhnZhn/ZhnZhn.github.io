"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const _isArr = Array.isArray;
const ItemStack = /*#__PURE__*/(0, _react.memo)(({
  items,
  crItem,
  ...restProps
}) => {
  if (!_isArr(items)) return null;
  return items.map((item, index) => crItem(item, index, restProps));
});
var _default = ItemStack;
exports.default = _default;
//# sourceMappingURL=ItemStack.js.map