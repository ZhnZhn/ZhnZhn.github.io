"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DivEllipsis = _interopRequireDefault(require("../../zhn/DivEllipsis"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT_DIV = {
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

const Text = _ref => {
  let {
    isShowLabels = true,
    caption,
    text,
    styleRoot,
    styleCaption,
    styleText
  } = _ref;
  if (!text) return null;

  const _styleCaption = isShowLabels ? void 0 : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_ROOT_DIV,
      ...styleRoot
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: { ...S_LABEL,
        ...styleCaption,
        ..._styleCaption
      },
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: { ...S_TEXT,
        ...styleText
      },
      text: text
    })]
  });
};

var _default = {
  Text
};
exports.default = _default;
//# sourceMappingURL=Row.js.map