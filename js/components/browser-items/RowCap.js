"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _crCurrencyFormatter = _interopRequireDefault(require("../../utils/crCurrencyFormatter"));

var NA = 'n/a';
var STYLE = {
  CAP: {
    paddingRight: 8
  },
  SALE_PRICE: {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: 8,
    width: 90,
    "float": 'right'
  },
  IPO: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: 70,
    "float": 'right'
  }
};

var _capFormatter = (0, _crCurrencyFormatter["default"])({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

var _formatter = (0, _crCurrencyFormatter["default"])();

var RowCap = function RowCap(_ref) {
  var cap = _ref.cap,
      salePrice = _ref.salePrice,
      ipo = _ref.ipo;

  var _cap = cap === 0 ? NA : _capFormatter.format(cap),
      _salePrice = cap !== NA && cap !== 0 ? _formatter.format(salePrice) : NA;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: STYLE.CAP,
      children: _cap
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: STYLE.IPO,
      children: "ipo " + ipo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: STYLE.SALE_PRICE,
      children: _salePrice
    })]
  });
};

var _default = RowCap;
exports["default"] = _default;
//# sourceMappingURL=RowCap.js.map