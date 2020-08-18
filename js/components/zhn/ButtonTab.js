"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';
var BT_TAB_CL = 'not-selected button-tab',
    BT_TAB__SHOW_CL = BT_TAB_CL + " button-tab--show",
    ARROW_CL = 'arrow-down';

var _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var _crBtClass = function _crBtClass(isShow, className) {
  var _btCl = _isBool(isShow) && isShow ? BT_TAB__SHOW_CL : BT_TAB_CL;

  return className ? _btCl + " " + className : _btCl;
};

var ButtonTab = function ButtonTab(_ref) {
  var _ref$is = _ref.is,
      is = _ref$is === void 0 ? true : _ref$is,
      isShow = _ref.isShow,
      isMenu = _ref.isMenu,
      className = _ref.className,
      style = _ref.style,
      caption = _ref.caption,
      children = _ref.children,
      onClick = _ref.onClick;
  var TS = (0, _useTheme["default"])(TH_ID);

  if (!is) {
    return null;
  }

  var _btClass = _crBtClass(isShow, className);

  return /*#__PURE__*/_react["default"].createElement("button", {
    className: _btClass,
    style: (0, _extends2["default"])({}, style, TS.BG),
    onClick: onClick
  }, caption, isMenu && /*#__PURE__*/_react["default"].createElement("span", {
    className: ARROW_CL
  }), children);
};

var _default = ButtonTab;
exports["default"] = _default;
//# sourceMappingURL=ButtonTab.js.map