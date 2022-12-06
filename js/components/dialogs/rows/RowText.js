"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DivEllipsis = _interopRequireDefault(require("../../zhn/DivEllipsis"));

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
  if (!text) return null;

  const _captionStyle = isShowLabels ? void 0 : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: { ...S_LABEL,
        ...captionStyle,
        ..._captionStyle
      },
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: { ...S_TEXT,
        ...textStyle
      },
      text: text
    })]
  });
};

var _default = RowText;
exports.default = _default;
//# sourceMappingURL=RowText.js.map