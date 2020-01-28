"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DialogStyles = _interopRequireDefault(require("../../styles/DialogStyles"));

var S = {
  ROOT_DIV: {
    margin: '5px',
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN: {
    display: 'inline-block',
    color: '#1b75bb',
    width: 100,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px'
  }
};

var Plain = function Plain(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return _react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, _DialogStyles["default"].rowDiv, {}, style)
  }, children);
};

var Text = function Text(_ref2) {
  var caption = _ref2.caption,
      text = _ref2.text,
      styleRoot = _ref2.styleRoot,
      styleCaption = _ref2.styleCaption,
      styleText = _ref2.styleText;
  return _react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.ROOT_DIV, {}, styleRoot)
  }, _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.LABEL_SPAN, {}, styleCaption)
  }, caption), _react["default"].createElement("span", {
    style: styleText
  }, text));
};

var _default = {
  Plain: Plain,
  Text: Text
};
exports["default"] = _default;
//# sourceMappingURL=Row.js.map