"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _A = _interopRequireDefault(require("../zhn/A"));

var _jsxRuntime = require("react/jsx-runtime");

const S_CAPTION = {
  display: 'inline-block',
  color: 'black',
  padding: '0 8px 6px 0',
  fontWeight: 'bold'
};

const RowPlusMinus = _ref => {
  let {
    is,
    styleCaption,
    caption,
    onMinus,
    onPlus
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: { ...S_CAPTION,
        ...styleCaption
      },
      children: caption
    }), is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgMinus, {
      onClick: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgPlus, {
      onClick: onPlus
    })]
  });
};

var _default = RowPlusMinus;
exports.default = _default;
//# sourceMappingURL=RowPlusMinus.js.map