"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _Comp = _interopRequireDefault(require("../Comp"));

var TH_ID = 'ELEMENT';
var CL_CAPTION = "not-selected text-clip bt-left";
var S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 42,
    paddingBottom: 6,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  CAPTION: {
    width: '75%',
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 2
  },
  OPEN: {
    color: '#a487d4'
  },
  CLOSE: {
    color: 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
  }
};
var MAX_LENGTH = 45;

var _crTitle = function _crTitle(title, caption) {
  return title || caption.length > MAX_LENGTH ? caption : void 0;
};

function ItemHeader(_ref) {
  var isOpen = _ref.isOpen,
      rootStyle = _ref.rootStyle,
      captionStyle = _ref.captionStyle,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      title = _ref.title,
      children = _ref.children,
      onClick = _ref.onClick,
      onClose = _ref.onClose;

  var theme = (0, _react.useContext)(_ThemeContext["default"]),
      TS = theme.getStyle(TH_ID),
      _title = _crTitle(title, caption),
      _styleCaption = isOpen ? S.OPEN : S.CLOSE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT, rootStyle, TS.ROOT),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL_CAPTION,
      style: (0, _extends2["default"])({}, S.CAPTION, captionStyle, _styleCaption),
      title: _title,
      onClick: onClick,
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].SvgClose, {
      style: S.SVG_CLOSE,
      onClose: onClose
    })]
  });
}

var _default = ItemHeader;
exports["default"] = _default;
//# sourceMappingURL=ItemHeader.js.map