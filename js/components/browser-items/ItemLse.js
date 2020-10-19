"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

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

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Item["default"], (0, _extends2["default"])({}, props, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: STYLE.CAP,
        children: _cap
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: STYLE.DATE,
        children: date
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: STYLE.COUNTRY,
        children: c
      })]
    })
  }));
};

var _default = ItemLse;
exports["default"] = _default;
//# sourceMappingURL=ItemLse.js.map