"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _FlexTokens = _interopRequireDefault(require("./FlexTokens"));

var _isArr = Array.isArray;
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
  INFO: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  DESCR: {
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: 1.8
  }
};

var Descr = function Descr(_ref) {
  var style = _ref.style,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? "Decription" : _ref$caption,
      descr = _ref.descr;
  if (!descr) return null;
  return /*#__PURE__*/_react["default"].createElement(_Comp["default"].OpenClose, {
    caption: caption,
    isClose: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.DESCR, style)
  }, descr));
};

var InfoItem = function InfoItem(_ref2) {
  var _ref2$config = _ref2.config,
      config = _ref2$config === void 0 ? {} : _ref2$config,
      onCloseItem = _ref2.onCloseItem;
  var caption = config.caption,
      items = config.items;

  var _useToggle = (0, _useToggle2["default"])(true),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROOT
  }, /*#__PURE__*/_react["default"].createElement(_ItemHeader["default"], {
    isOpen: isOpen,
    rootStyle: S.HEADER,
    captionStyle: S.CAPTION,
    caption: caption,
    onClick: toggleIsOpen,
    onClose: onCloseItem
  }), /*#__PURE__*/_react["default"].createElement(_Comp["default"].ShowHide, {
    isShow: isOpen
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: S.INFO
  }, items.map(function (item, index) {
    var _key = item.caption || index;

    return _isArr(item.tokens) ? /*#__PURE__*/_react["default"].createElement(_FlexTokens["default"], (0, _extends2["default"])({
      key: _key
    }, item)) : /*#__PURE__*/_react["default"].createElement(Descr, (0, _extends2["default"])({
      key: _key
    }, item));
  }))));
};

var _default = InfoItem;
exports["default"] = _default;
//# sourceMappingURL=InfoItem.js.map