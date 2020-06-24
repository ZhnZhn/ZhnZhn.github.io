"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

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

  var TS = (0, _useTheme["default"])(TH_ID),
      _rootClass = _isBool(isShow) & isShow ? CL.BT_TAB__SHOW : CL.BT_TAB,
      _btClass = className ? _rootClass + " " + className : _rootClass;

  return /*#__PURE__*/_react["default"].createElement("button", {
    className: _btClass,
    style: (0, _extends2["default"])({}, style, TS.BG),
    onClick: onClick
  }, caption, isMenu && /*#__PURE__*/_react["default"].createElement("span", {
    className: CL.ARROW
  }), children);
};

var _default = ButtonTab;
exports["default"] = _default;
//# sourceMappingURL=ButtonTab.js.map