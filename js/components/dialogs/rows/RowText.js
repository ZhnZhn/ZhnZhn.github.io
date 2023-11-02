"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DivEllipsis = _interopRequireDefault(require("../../zhn/DivEllipsis"));
var _styleFn = require("../../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV = {
    display: 'flex',
    margin: '5px 5px 5px 10px',
    lineHeight: 2,
    fontWeight: 'bold'
  },
  S_LABEL = {
    color: '#1b75bb',
    width: 95,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px'
  },
  S_TEXT = {
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle'
  },
  S_NONE = {
    display: 'none'
  };
const RowText = _ref => {
  let {
    isShowLabels = true,
    caption,
    text,
    style,
    captionStyle,
    textStyle
  } = _ref;
  return text ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        ...S_LABEL,
        ...captionStyle,
        ...(isShowLabels ? void 0 : S_NONE)
      },
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: {
        ..._styleFn.S_COLOR_BLACK,
        ...S_TEXT,
        ...textStyle
      },
      text: text
    })]
  }) : null;
};
var _default = exports.default = RowText;
//# sourceMappingURL=RowText.js.map