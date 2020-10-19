"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Comp = _interopRequireDefault(require("../Comp"));

var S = {
  TOKENS: {
    display: 'flex',
    flexFlow: 'wrap',
    lineHeight: 2
  },
  TOKEN: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 600,
    whiteSpace: 'nowrap'
  }
};

var FlexSpans = function FlexSpans(_ref) {
  var _ref$tokens = _ref.tokens,
      tokens = _ref$tokens === void 0 ? [] : _ref$tokens;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.TOKENS,
    children: tokens.map(function (token) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.TOKEN,
        children: token
      }, token);
    })
  });
};

var FlexTokens = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var caption = _ref2.caption,
      tokens = _ref2.tokens;
  return caption ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].OpenClose, {
    isClose: false,
    caption: caption,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
      tokens: tokens
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FlexSpans, {
    tokens: tokens
  });
});
var _default = FlexTokens;
exports["default"] = _default;
//# sourceMappingURL=FlexTokens.js.map