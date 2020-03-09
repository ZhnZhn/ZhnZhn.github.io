"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';
var CL = {
  BT_TAB: 'button-tab not-selected',
  BT_TAB__SHOW: 'button-tab button-tab--show not-selected',
  ARROW: 'arrow-down'
};

var _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var ButtonTab = function ButtonTab(_ref) {
  var isShow = _ref.isShow,
      isMenu = _ref.isMenu,
      className = _ref.className,
      style = _ref.style,
      caption = _ref.caption,
      children = _ref.children,
      onClick = _ref.onClick;

  var theme = (0, _react.useContext)(_ThemeContext["default"]),
      TS = theme.getStyle(TH_ID),
      _rootClass = _isBool(isShow) & isShow ? CL.BT_TAB__SHOW : CL.BT_TAB,
      _btClass = className ? _rootClass + " " + className : _rootClass;

  return _react["default"].createElement("button", {
    className: _btClass,
    style: (0, _extends2["default"])({}, style, {}, TS.BG),
    onClick: onClick
  }, caption, isMenu && _react["default"].createElement("span", {
    className: CL.ARROW
  }), children);
};

var _default = ButtonTab;
exports["default"] = _default;
//# sourceMappingURL=ButtonTab.js.map