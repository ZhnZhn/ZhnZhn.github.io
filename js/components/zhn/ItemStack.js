"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _isArr = Array.isArray;
var ItemStack = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var items = _ref.items,
      crItem = _ref.crItem;
  if (!_isArr(items)) return null;
  return items.map(crItem);
});
var _default = ItemStack;
exports["default"] = _default;
//# sourceMappingURL=ItemStack.js.map