"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Item = _interopRequireDefault(require("./Item"));
var _RowCap = _interopRequireDefault(require("./RowCap"));
var _jsxRuntime = require("react/jsx-runtime");
const ItemWithCap = props => {
  const {
      item
    } = props,
    {
      cap,
      salePrice,
      ipo
    } = item;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Item.default, {
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCap.default, {
      cap: cap,
      salePrice: salePrice,
      ipo: ipo
    })
  });
};
var _default = ItemWithCap;
exports.default = _default;
//# sourceMappingURL=ItemWithCap.js.map