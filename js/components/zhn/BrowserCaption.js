"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _SvgMore = _interopRequireDefault(require("./SvgMore"));

var _SvgCheckBox = _interopRequireDefault(require("./SvgCheckBox"));

var _SvgClose = _interopRequireDefault(require("./SvgClose"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';
var CL = {
  ROOT: 'gap-right',
  NOT_SELECTED: 'not-selected'
};
var S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    height: 34,
    paddingLeft: 10,
    paddingRight: 42,
    marginBottom: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    position: 'relative',
    top: 6,
    paddingRight: 8,
    fontSize: '18px',
    fontWeight: '500'
  },
  BT_MORE: {
    position: 'relative',
    top: 3
  },
  SVG_MORE: {
    fill: 'inherit',
    stroke: 'inherit'
  },
  CHECK_BOX: {
    position: 'relative',
    top: 1,
    marginLeft: 6,
    marginRight: 10
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: 6,
    right: 0
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var BrowserCaption = function BrowserCaption(_ref) {
  var style = _ref.style,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle,
      children = _ref.children,
      onMore = _ref.onMore,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck,
      onClose = _ref.onClose;
  var TS = (0, _useTheme["default"])(TH_ID);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.ROOT,
    style: (0, _extends2["default"])({}, S.ROOT, style, TS.ROOT)
  }, _isFn(onMore) && /*#__PURE__*/_react["default"].createElement(_SvgMore["default"], {
    style: S.BT_MORE,
    svgStyle: S.SVG_MORE,
    onClick: onMore
  }), _isFn(onCheck) && _isFn(onUnCheck) && /*#__PURE__*/_react["default"].createElement(_SvgCheckBox["default"], {
    initValue: false,
    style: S.CHECK_BOX,
    onCheck: onCheck,
    onUnCheck: onUnCheck
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: CL.NOT_SELECTED,
    style: (0, _extends2["default"])({}, S.CAPTION, captionStyle)
  }, caption), children, /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
    style: S.SVG_CLOSE,
    onClose: onClose
  }));
};
/*
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onClose: PropTypes.func
}
*/


var _default = BrowserCaption;
exports["default"] = _default;
//# sourceMappingURL=BrowserCaption.js.map