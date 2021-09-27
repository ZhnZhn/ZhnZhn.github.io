"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Comp = _interopRequireDefault(require("../Comp"));

var _jsxRuntime = require("react/jsx-runtime");

const S_TOKENS = {
  display: 'flex',
  flexFlow: 'wrap',
  lineHeight: 2
},
      S_TOKEN = {
  display: 'inline-block',
  padding: '0 8px',
  fontWeight: 600,
  whiteSpace: 'nowrap'
};

const _crTokenItem = token => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: S_TOKEN,
  children: token
}, token);

const FlexSpans = ({
  tokens
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: S_TOKENS,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ItemStack, {
    items: tokens,
    crItem: _crTokenItem
  })
});

const FlexTokens = ({
  caption,
  tokens
}) => {
  return caption ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose, {
    isClose: false,
    caption: caption,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
      tokens: tokens
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
    tokens: tokens
  });
};

var _default = FlexTokens;
exports.default = _default;
//# sourceMappingURL=FlexTokens.js.map