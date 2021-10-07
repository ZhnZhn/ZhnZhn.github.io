"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crCurrencyFormatter = _interopRequireDefault(require("../../utils/crCurrencyFormatter"));

var _Item = _interopRequireDefault(require("./Item"));

var _jsxRuntime = require("react/jsx-runtime");

const NA = 'n/a',
      ML = ' ml';
const S_CAP = {
  paddingRight: 8
},
      S_COUNTRY = {
  display: 'display-inline',
  color: 'gray',
  width: 35,
  float: 'right'
},
      S_DATE = {
  display: 'display-inline',
  color: 'rgb(253, 179, 22)',
  width: 85,
  float: 'right'
};

const _formatter = (0, _crCurrencyFormatter.default)({
  currency: 'GBP',
  minimumFractionDigits: 3
});

const ItemLse = props => {
  const {
    item
  } = props,
        {
    cap,
    c,
    date
  } = item || {},
        _cap = cap === 0 ? NA : _formatter.format(cap) + ML;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Item.default, { ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_CAP,
        children: _cap
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_DATE,
        children: date
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_COUNTRY,
        children: c
      })]
    })
  });
};

var _default = ItemLse;
exports.default = _default;
//# sourceMappingURL=ItemLse.js.map