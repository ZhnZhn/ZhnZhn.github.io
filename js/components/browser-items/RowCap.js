"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.CAP
  }, _cap), /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.IPO
  }, "ipo " + ipo), /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.SALE_PRICE
  }, _salePrice));
};

var _default = RowCap;
exports["default"] = _default;
//# sourceMappingURL=RowCap.js.map