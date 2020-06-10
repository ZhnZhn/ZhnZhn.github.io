"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DialogStyles = _interopRequireDefault(require("../../styles/DialogStyles"));

var S = {
  ROOT_DIV: {
    margin: 5,
    marginLeft: 10,
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN: {
    display: 'inline-block',
    color: '#1b75bb',
    width: 95,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px'
  },
  TEXT: {
    display: 'inline-block',
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  NONE: {
    display: 'none'
  }
};

var Plain = function Plain(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, _DialogStyles["default"].rowDiv, style)
  }, children);
};

var Text = function Text(_ref2) {
  var _ref2$isShowLabels = _ref2.isShowLabels,
      isShowLabels = _ref2$isShowLabels === void 0 ? true : _ref2$isShowLabels,
      caption = _ref2.caption,
      text = _ref2.text,
      styleRoot = _ref2.styleRoot,
      styleCaption = _ref2.styleCaption,
      styleText = _ref2.styleText;
  if (!text) return null;

  var _styleCaption = isShowLabels ? void 0 : S.NONE;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.ROOT_DIV, styleRoot)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.LABEL_SPAN, styleCaption, _styleCaption)
  }, caption), /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.TEXT, styleText)
  }, text));
};

var _default = {
  Plain: Plain,
  Text: Text
};
exports["default"] = _default;
//# sourceMappingURL=Row.js.map