"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import PropTypes from 'prop-types'
var useToggle = _use["default"].useToggle,
    useKeyEnter = _use["default"].useKeyEnter;
var CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected',
  OC_EXP: 'zhn-oc__exp'
};
var FILL_CLOSE_COLOR = _Color["default"].BLANK;
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
      openColor = _ref.openColor;
  return isOpen ? {
    _pathV: PATH_OPEN,
    _fillV: openColor,
    _childCl: CL.OC_EXP + " " + CL.SHOW_POPUP,
    _childStyle: S.BLOCK
  } : {
    _pathV: PATH_CLOSE,
    _fillV: FILL_CLOSE_COLOR,
    _childCl: CL.OC_EXP,
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
      openColor = _ref2.openColor,
      CompAfter = _ref2.CompAfter,
      childStyle = _ref2.childStyle,
      children = _ref2.children;

  var _useToggle = useToggle(!isClose),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      _hKeyDown = useKeyEnter(toggleIsOpen),
      _crConf2 = _crConf({
    isOpen: isOpen,
    openColor: openColor
  }),
      _pathV = _crConf2._pathV,
      _fillV = _crConf2._fillV,
      _childCl = _crConf2._childCl,
      _childStyle = _crConf2._childStyle;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT_DIV, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL.NOT_SELECTED,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        tabIndex: "0",
        role: role,
        className: CL.ROOT,
        style: ocStyle,
        onClick: toggleIsOpen,
        onKeyDown: _hKeyDown,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
          viewBox: "0 0 16 16",
          width: "100%",
          height: "100%",
          preserveAspectRatio: "none",
          xmlns: "http://www.w3.org/2000/svg",
          style: S.SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            fill: _fillV,
            strokeWidth: "1",
            stroke: openColor,
            d: _pathV
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: (0, _extends2["default"])({}, S.CAPTION, captionStyle),
          children: caption
        })]
      }), CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-expanded": isOpen,
      className: _childCl,
      style: (0, _extends2["default"])({}, childStyle, _childStyle),
      children: children
    })]
  });
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
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/


var _default = OpenClose;
exports["default"] = _default;
//# sourceMappingURL=OpenClose.js.map