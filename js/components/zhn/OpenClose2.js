"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var useToggle = _use["default"].useToggle,
    useKeyEnter = _use["default"].useKeyEnter;
var CL = {
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected zhn-oc',
  OC_EXP: 'zhn-oc__exp'
};
var FILL_CLOSE_COLOR = _Color["default"].BLANK;
var S = {
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
var PATH = {
  OPEN: "M 2,14 L 14,14 14,2 2,14",
  CLOSE: "M 2,2 L 14,8 2,14 2,2"
};

var _crStyleConf = function _crStyleConf(_ref) {
  var isOpen = _ref.isOpen,
      openColor = _ref.openColor,
      notSelectedStyle = _ref.notSelectedStyle;
  return isOpen ? {
    _pathV: PATH.OPEN,
    _fillV: openColor,
    _divStyle: S.BLOCK,
    _expClass: CL.OC_EXP + " " + CL.SHOW,
    _notSelectedStyle: null
  } : {
    _pathV: PATH.CLOSE,
    _fillV: FILL_CLOSE_COLOR,
    _divStyle: S.NONE,
    _expClass: CL.OC_EXP,
    _notSelectedStyle: notSelectedStyle
  };
};

var OpenClose2 = function OpenClose2(_ref2) {
  var isInitialOpen = _ref2.isInitialOpen,
      style = _ref2.style,
      ocStyle = _ref2.ocStyle,
      notSelectedStyle = _ref2.notSelectedStyle,
      captionStyle = _ref2.captionStyle,
      caption = _ref2.caption,
      openColor = _ref2.openColor,
      isDraggable = _ref2.isDraggable,
      option = _ref2.option,
      onDragStart = _ref2.onDragStart,
      onDragEnter = _ref2.onDragEnter,
      onDragOver = _ref2.onDragOver,
      onDragLeave = _ref2.onDragLeave,
      onDrop = _ref2.onDrop,
      children = _ref2.children;

  var _useToggle = useToggle(isInitialOpen),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      _hKeyDown = useKeyEnter(toggleIsOpen),
      _dragOption = isDraggable ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragEnter: onDragEnter,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave
  } : void 0,
      _crStyleConf2 = _crStyleConf({
    isOpen: isOpen,
    openColor: openColor,
    notSelectedStyle: notSelectedStyle
  }),
      _pathV = _crStyleConf2._pathV,
      _fillV = _crStyleConf2._fillV,
      _divStyle = _crStyleConf2._divStyle,
      _expClass = _crStyleConf2._expClass,
      _notSelectedStyle = _crStyleConf2._notSelectedStyle;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2["default"])({
      role: "menuitem",
      tabIndex: "0",
      className: CL.NOT_SELECTED,
      style: (0, _extends2["default"])({}, ocStyle, _notSelectedStyle),
      onClick: toggleIsOpen,
      onKeyDown: _hKeyDown
    }, _dragOption, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        viewBox: "0 0 16 16",
        width: "100%",
        height: "100%",
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: S.SVG,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: _pathV,
          fill: _fillV,
          strokeWidth: "1",
          stroke: openColor
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: (0, _extends2["default"])({}, S.CAPTION, captionStyle),
        children: caption
      })]
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-expanded": isOpen,
      className: _expClass,
      style: _divStyle,
      children: children
    })]
  });
};

var _default = OpenClose2;
exports["default"] = _default;
//# sourceMappingURL=OpenClose2.js.map