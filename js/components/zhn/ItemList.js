"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _IfTrue = require("./IfTrue");
var _jsxRuntime = require("react/jsx-runtime");
const UL_STYLE = {
    listStyle: 'none'
  },
  _crKeyDf = (_, index) => index;
const ItemList = (0, _uiApi.memo)(_ref => {
  let {
    style,
    items,
    crKey = _crKeyDf,
    crItem
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IfTrue.IfTrue, {
    v: (0, _uiApi.isArr)(items),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      style: {
        ...UL_STYLE,
        ...style
      },
      children: items.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        children: crItem(item)
      }, crKey(item, index)))
    })
  });
});
var _default = exports.default = ItemList;
//# sourceMappingURL=ItemList.js.map