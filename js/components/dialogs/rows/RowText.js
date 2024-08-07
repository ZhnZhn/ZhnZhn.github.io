"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DivEllipsis = _interopRequireDefault(require("../../zhn/DivEllipsis"));
var _SpanToken = require("../../zhn/SpanToken");
var _styleFn = require("../../styleFn");
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV = {
    display: 'flex',
    margin: '5px 5px 5px 10px',
    lineHeight: 2
  },
  S_TEXT = {
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle',
    fontWeight: 'bold'
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: (0, _crRowLabelStyle.default)({
        captionStyle,
        isShowLabels
      }),
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      className: _styleFn.CL_BLACK,
      style: {
        ...S_TEXT,
        ...textStyle
      },
      text: text
    })]
  }) : null;
};
var _default = exports.default = RowText;
//# sourceMappingURL=RowText.js.map