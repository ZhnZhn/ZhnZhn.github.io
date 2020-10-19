"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _A = _interopRequireDefault(require("../zhn/A"));

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 8,
    paddingBottom: 6,
    fontWeight: 'bold'
  }
};

var RowPlusMinus = function RowPlusMinus(_ref) {
  var is = _ref.is,
      styleCaption = _ref.styleCaption,
      caption = _ref.caption,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: (0, _extends2["default"])({}, S.CAPTION, styleCaption),
      children: caption
    }), is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgMinus, {
      onClick: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
      onClick: onPlus
    })]
  });
};

var _default = RowPlusMinus;
exports["default"] = _default;
//# sourceMappingURL=RowPlusMinus.js.map