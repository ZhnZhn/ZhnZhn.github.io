"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _Item = _interopRequireDefault(require("./Item"));

var _RowCap = _interopRequireDefault(require("./RowCap"));

var ItemWithCap = function ItemWithCap(props) {
  var item = props.item,
      cap = item.cap,
      salePrice = item.salePrice,
      ipo = item.ipo;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Item["default"], (0, _extends2["default"])({}, props, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCap["default"], {
      cap: cap,
      salePrice: salePrice,
      ipo: ipo
    })
  }));
};

var _default = ItemWithCap;
exports["default"] = _default;
//# sourceMappingURL=ItemWithCap.js.map