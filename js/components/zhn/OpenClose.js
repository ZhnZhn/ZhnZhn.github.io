"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import PropTypes from 'prop-types'
var useToggle = _use["default"].useToggle,
    useKeyEnter = _use["default"].useKeyEnter;
var CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};
var DF = {
  OPEN_COLOR: _Color["default"].TITLE,
  CLOSE_COLOR: _Color["default"].BLANK
};
var S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  SVG: {
    display: 'inline-block',
    position: 'relative',
    top: 1,
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    color: _Color["default"].TITLE,
    paddingLeft: 4,
    fontFamily: 'Roboto, Arial, Lato, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};
var PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
var PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var _crConf = function _crConf(_ref) {
  var isOpen = _ref.isOpen,
      openColor = _ref.openColor,
      closeColor = _ref.closeColor;
  return isOpen ? {
    _pathV: PATH_OPEN,
    _fillV: openColor,
    _childCl: CL.SHOW_POPUP,
    _childStyle: S.BLOCK
  } : {
    _pathV: PATH_CLOSE,
    _fillV: closeColor,
    _childCl: null,
    _childStyle: S.NONE
  };
};

var OpenClose = function OpenClose(_ref2) {
  var _ref2$isClose = _ref2.isClose,
      isClose = _ref2$isClose === void 0 ? true : _ref2$isClose,
      _ref2$role = _ref2.role,
      role = _ref2$role === void 0 ? 'button' : _ref2$role,
      style = _ref2.style,
      ocStyle = _ref2.ocStyle,
      caption = _ref2.caption,
      captionStyle = _ref2.captionStyle,
      _ref2$openColor = _ref2.openColor,
      openColor = _ref2$openColor === void 0 ? DF.OPEN_COLOR : _ref2$openColor,
      _ref2$closeColor = _ref2.closeColor,
      closeColor = _ref2$closeColor === void 0 ? DF.CLOSE_COLOR : _ref2$closeColor,
      CompAfter = _ref2.CompAfter,
      childStyle = _ref2.childStyle,
      children = _ref2.children;

  var _useToggle = useToggle(function () {
    return !isClose;
  }),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      _hKeyDown = useKeyEnter(toggleIsOpen),
      _crConf2 = _crConf({
    isOpen: isOpen,
    openColor: openColor,
    closeColor: closeColor
  }),
      _pathV = _crConf2._pathV,
      _fillV = _crConf2._fillV,
      _childCl = _crConf2._childCl,
      _childStyle = _crConf2._childStyle;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.ROOT_DIV, style)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.NOT_SELECTED
  }, /*#__PURE__*/_react["default"].createElement("div", {
    tabIndex: "0",
    role: role,
    className: CL.ROOT,
    style: ocStyle,
    onClick: toggleIsOpen,
    onKeyDown: _hKeyDown
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 16 16",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: S.SVG
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fill: _fillV,
    strokeWidth: "1",
    stroke: openColor,
    d: _pathV
  })), /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.CAPTION, captionStyle)
  }, caption)), CompAfter), /*#__PURE__*/_react["default"].createElement("div", {
    role: "region",
    className: _childCl,
    style: (0, _extends2["default"])({}, childStyle, _childStyle)
  }, children));
};
/*
OpenClose.propTypes = {
  isClose: PropTypes.bool,
  role: PropTypes.string
  style: PropTypes.object,
  ocStyle: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  openColor: PropTypes.string,
  closeColor: PropTypes.string,
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/


var _default = OpenClose;
exports["default"] = _default;
//# sourceMappingURL=OpenClose.js.map