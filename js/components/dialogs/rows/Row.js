"use strict";

exports.__esModule = true;
exports.default = void 0;

var _GeneralStyles = require("../../styles/GeneralStyles");

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT_DIV = {
  margin: '5px 5px 5px 10px',
  lineHeight: 2,
  fontWeight: 'bold'
},
      S_LABEL_SPAN = {
  display: 'inline-block',
  color: '#1b75bb',
  width: 95,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
},
      S_TEXT = {
  display: 'inline-block',
  maxWidth: 200,
  height: 32,
  verticalAlign: 'middle',
  ..._GeneralStyles.S_ELLIPSIS
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: { ...S_LABEL_SPAN,
        ...styleCaption,
        ..._styleCaption
      },
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: { ...S_TEXT,
        ...styleText
      },
      children: text
    })]
  });
};

var _default = {
  Text
};
exports.default = _default;
//# sourceMappingURL=Row.js.map