"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  UL_STYLE = {
    listStyle: 'none'
  },
  _crKeyDf = (_, index) => index;
const ItemList = /*#__PURE__*/(0, _react.memo)(_ref => {
  let {
    items,
    crKey = _crKeyDf,
    crItem
  } = _ref;
  if (!_isArr(items)) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    style: UL_STYLE,
    children: items.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      children: crItem(item)
    }, crKey(item, index)))
  });
});
var _default = ItemList;
exports.default = _default;
//# sourceMappingURL=ItemList.js.map