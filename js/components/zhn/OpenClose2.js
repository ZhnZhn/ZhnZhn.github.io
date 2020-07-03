"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var useToggle = _use["default"].useToggle,
    useKeyEnter = _use["default"].useKeyEnter;
var CL = {
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected zhn-oc'
};
var DF = {
  OPEN_COLOR: _Color["default"].YELLOW,
  CLOSE_COLOR: _Color["default"].BLANK
};
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
var PATH = {
  OPEN: "M 2,14 L 14,14 14,2 2,14",
  CLOSE: "M 2,2 L 14,8 2,14 2,2"
};

var _crStyleConf = function _crStyleConf(_ref) {
  var isOpen = _ref.isOpen,
      openColor = _ref.openColor,
      closeColor = _ref.closeColor,
      notSelectedStyle = _ref.notSelectedStyle;
  return isOpen ? {
    _pathV: PATH.OPEN,
    _fillV: openColor,
    _divStyle: S.BLOCK,
    _classShow: CL.SHOW,
    _notSelectedStyle: null
  } : {
    _pathV: PATH.CLOSE,
    _fillV: closeColor,
    _divStyle: S.NONE,
    _classShow: null,
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
      _ref2$openColor = _ref2.openColor,
      openColor = _ref2$openColor === void 0 ? DF.OPEN_COLOR : _ref2$openColor,
      _ref2$closeColor = _ref2.closeColor,
      closeColor = _ref2$closeColor === void 0 ? DF.CLOSE_COLOR : _ref2$closeColor,
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
    closeColor: closeColor,
    notSelectedStyle: notSelectedStyle
  }),
      _pathV = _crStyleConf2._pathV,
      _fillV = _crStyleConf2._fillV,
      _divStyle = _crStyleConf2._divStyle,
      _classShow = _crStyleConf2._classShow,
      _notSelectedStyle = _crStyleConf2._notSelectedStyle;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    role: "menuitem",
    tabIndex: "0",
    className: CL.NOT_SELECTED,
    style: (0, _extends2["default"])({}, ocStyle, _notSelectedStyle),
    onClick: toggleIsOpen,
    onKeyDown: _hKeyDown
  }, _dragOption), /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 16 16",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: S.SVG
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: _pathV,
    fill: _fillV,
    strokeWidth: "1",
    stroke: openColor
  })), /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.CAPTION, captionStyle)
  }, caption)), /*#__PURE__*/_react["default"].createElement("div", {
    role: "region",
    className: _classShow,
    style: _divStyle
  }, children));
};

var _default = OpenClose2;
exports["default"] = _default;
//# sourceMappingURL=OpenClose2.js.map