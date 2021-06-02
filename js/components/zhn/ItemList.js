"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _isArr = Array.isArray,
    UL_STYLE = {
  listStyle: 'none'
},
    _crKeyDf = function _crKeyDf(_, index) {
  return index;
};

var ItemList = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var items = _ref.items,
      _ref$crKey = _ref.crKey,
      crKey = _ref$crKey === void 0 ? _crKeyDf : _ref$crKey,
      crItem = _ref.crItem;
  if (!_isArr(items)) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    style: UL_STYLE,
    children: items.map(function (item, index) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        children: crItem(item)
      }, crKey(item, index));
    })
  });
});
var _default = ItemList;
exports["default"] = _default;
//# sourceMappingURL=ItemList.js.map