"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crCurrencyFormatter = _interopRequireDefault(require("../../utils/crCurrencyFormatter"));

var _jsxRuntime = require("react/jsx-runtime");

const NA = 'n/a';
const S_CAP = {
  paddingRight: 8
},
      S_SALE_PRICE = {
  display: 'display-inline',
  color: '#2f7ed8',
  paddingRight: 8,
  width: 90,
  float: 'right'
},
      S_IPO = {
  display: 'display-inline',
  color: '#fdb316',
  width: 70,
  float: 'right'
};

const _capFormatter = (0, _crCurrencyFormatter.default)({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const _formatter = (0, _crCurrencyFormatter.default)();

const RowCap = ({
  cap,
  salePrice,
  ipo
}) => {
  const _cap = cap === 0 ? NA : _capFormatter.format(cap),
        _salePrice = cap !== NA && cap !== 0 ? _formatter.format(salePrice) : NA;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_CAP,
      children: _cap
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_IPO,
      children: "ipo " + ipo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_SALE_PRICE,
      children: _salePrice
    })]
  });
};

var _default = RowCap;
exports.default = _default;
//# sourceMappingURL=RowCap.js.map