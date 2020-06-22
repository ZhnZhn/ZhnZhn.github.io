"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.TOKENS
  }, tokens.map(function (token) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: token,
      style: S.TOKEN
    }, token);
  }));
};

var FlexTokens = /*#__PURE__*/_react["default"].memo(function (_ref2) {
  var caption = _ref2.caption,
      tokens = _ref2.tokens;
  return caption ? /*#__PURE__*/_react["default"].createElement(_Comp["default"].OpenClose, {
    isClose: false,
    caption: caption
  }, /*#__PURE__*/_react["default"].createElement(FlexSpans, {
    tokens: tokens
  })) : /*#__PURE__*/_react["default"].createElement(FlexSpans, {
    tokens: tokens
  });
});

var _default = FlexTokens;
exports["default"] = _default;
//# sourceMappingURL=FlexTokens.js.map