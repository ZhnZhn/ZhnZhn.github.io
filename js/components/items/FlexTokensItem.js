"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var S = {
  ROOT: {
    marginBottom: 10
  },
  HEADER: {
    height: 30
  },
  CAPTION: {
    width: 'auto'
  },
  TOKENS: {
    display: 'flex',
    flexFlow: 'wrap',
    lineHeight: 2
  },
  INFO: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  TOKEN: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 600
  },
  DESCR: {
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: 1.8
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

var Tokens = function Tokens(_ref2) {
  var tokens = _ref2.tokens,
      tokensName = _ref2.tokensName;
  return tokensName ? /*#__PURE__*/_react["default"].createElement(_Comp["default"].OpenClose, {
    caption: tokensName,
    isClose: false
  }, /*#__PURE__*/_react["default"].createElement(FlexSpans, {
    tokens: tokens
  })) : /*#__PURE__*/_react["default"].createElement(FlexSpans, {
    tokens: tokens
  });
};

var Descr = function Descr(_ref3) {
  var descrStyle = _ref3.descrStyle,
      _ref3$descrName = _ref3.descrName,
      descrName = _ref3$descrName === void 0 ? "Decription" : _ref3$descrName,
      descr = _ref3.descr;
  if (!descr) return null;
  return /*#__PURE__*/_react["default"].createElement(_Comp["default"].OpenClose, {
    caption: descrName,
    isClose: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.DESCR, descrStyle)
  }, descr));
};

var FlexTokensItem = function FlexTokensItem(props) {
  var config = props.config,
      onCloseItem = props.onCloseItem,
      _ref4 = config || {},
      caption = _ref4.caption,
      tokens = _ref4.tokens,
      tokensName = _ref4.tokensName,
      descr = _ref4.descr,
      descrName = _ref4.descrName,
      descrStyle = _ref4.descrStyle,
      _useState = (0, _react.useState)(true),
      isOpen = _useState[0],
      setIsOpen = _useState[1],
      _hToggle = (0, _react.useCallback)(function () {
    setIsOpen(function (isOpen) {
      return !isOpen;
    });
  }, []);

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROOT
  }, /*#__PURE__*/_react["default"].createElement(_ItemHeader["default"], {
    isOpen: isOpen,
    rootStyle: S.HEADER,
    captionStyle: S.CAPTION,
    caption: caption,
    onClick: _hToggle,
    onClose: onCloseItem
  }), /*#__PURE__*/_react["default"].createElement(_Comp["default"].ShowHide, {
    isShow: isOpen
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: S.INFO
  }, /*#__PURE__*/_react["default"].createElement(Tokens, {
    tokens: tokens,
    tokensName: tokensName
  }), /*#__PURE__*/_react["default"].createElement(Descr, {
    descr: descr,
    descrName: descrName,
    descrStyle: descrStyle
  }))));
};

var _default = FlexTokensItem;
exports["default"] = _default;
//# sourceMappingURL=FlexTokensItem.js.map