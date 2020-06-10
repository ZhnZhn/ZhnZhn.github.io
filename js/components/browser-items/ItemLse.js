"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _crCurrencyFormatter = _interopRequireDefault(require("../../utils/crCurrencyFormatter"));

var _Item = _interopRequireDefault(require("./Item"));

var NA = 'n/a',
    ML = ' ml';
var STYLE = {
  CAP: {
    paddingRight: 8
  },
  COUNTRY: {
    display: 'display-inline',
    color: 'gray',
    width: 35,
    "float": 'right'
  },
  DATE: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: 85,
    "float": 'right'
  }
};

var _formatter = (0, _crCurrencyFormatter["default"])({
  currency: 'GBP',
  minimumFractionDigits: 3
});

var ItemLse = function ItemLse(props) {
  var item = props.item,
      _ref = item || {},
      cap = _ref.cap,
      c = _ref.c,
      date = _ref.date,
      _cap = cap === 0 ? NA : _formatter.format(cap) + ML;

  return /*#__PURE__*/_react["default"].createElement(_Item["default"], props, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.CAP
  }, _cap), /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.DATE
  }, date), /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.COUNTRY
  }, c)));
};

var _default = ItemLse;
exports["default"] = _default;
//# sourceMappingURL=ItemLse.js.map