"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

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
    //color: 'rgba(164, 135, 212, 1)',
    //color: 'silver'
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '4px',
    paddingRight: '42px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    //color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_MORE: {
    fill: 'inherit',
    stroke: 'inherit' //fill: 'silver',
    //stroke: 'silver'

  },
  CHECK_BOX: {
    marginLeft: 10,
    marginRight: 10
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var BrowserCaption = function BrowserCaption(_ref) {
  var theme = _ref.theme,
      onMore = _ref.onMore,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck,
      caption = _ref.caption,
      children = _ref.children,
      onClose = _ref.onClose;
  var TS = theme.getStyle(TH_ID);
  return _react["default"].createElement("div", {
    className: CL.ROOT,
    style: (0, _extends2["default"])({}, S.ROOT, {}, TS.ROOT)
  }, _isFn(onMore) && _react["default"].createElement(_SvgMore["default"], {
    svgStyle: S.SVG_MORE,
    onClick: onMore
  }), _isFn(onCheck) && _isFn(onUnCheck) && _react["default"].createElement(_SvgCheckBox["default"], {
    style: S.CHECK_BOX,
    onCheck: onCheck,
    onUnCheck: onUnCheck
  }), _react["default"].createElement("span", {
    className: CL.NOT_SELECTED,
    style: S.CAPTION
  }, caption), children, _react["default"].createElement(_SvgClose["default"], {
    style: S.SVG_CLOSE,
    onClose: onClose
  }));
};
/*
BrowserCaption.propTypes = {
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  caption: PropTypes.string,
  onClose: PropTypes.func
}
*/


var _default = (0, _withTheme["default"])(BrowserCaption);

exports["default"] = _default;
//# sourceMappingURL=BrowserCaption.js.map