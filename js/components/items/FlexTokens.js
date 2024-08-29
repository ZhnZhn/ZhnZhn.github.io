"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
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
const FlexSpans = _ref => {
  let {
    tokens
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_TOKENS,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: tokens,
      crItem: _crTokenItem
    })
  });
};
const FlexTokens = _ref2 => {
  let {
    caption,
    tokens
  } = _ref2;
  return caption ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    isClose: false,
    caption: caption,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
      tokens: tokens
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
    tokens: tokens
  });
};
var _default = exports.default = FlexTokens;
//# sourceMappingURL=FlexTokens.js.map