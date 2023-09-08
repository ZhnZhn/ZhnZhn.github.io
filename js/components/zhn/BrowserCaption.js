"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Color = require("../styles/Color");
var _SvgMore = _interopRequireDefault(require("./SvgMore"));
var _SvgCheckBox = _interopRequireDefault(require("./SvgCheckBox"));
var _SvgClose = _interopRequireDefault(require("./SvgClose"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_TEXT_CLIP = 'text-clip',
  CL_BR_CAPTION = "br-caption " + CL_TEXT_CLIP + " gap-right el",
  CL_CAPTION = "not-selected " + CL_TEXT_CLIP,
  S_CAPTION = {
    paddingRight: 8,
    fontSize: '18px',
    fontWeight: '500'
  },
  S_CHECK_BOX = {
    position: 'relative',
    top: -3,
    margin: '0 10px 0 6px'
  },
  S_SVG_CLOSE = {
    position: 'absolute',
    top: 6,
    right: 0
  };
const _isFn = fn => typeof fn === 'function';
const BrowserCaption = _ref => {
  let {
    style,
    captionStyle,
    caption,
    svgMoreStyle,
    children,
    onMore,
    onCheck,
    onUnCheck,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_BR_CAPTION,
    style: style,
    children: [_isFn(onMore) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      style: svgMoreStyle,
      onClick: onMore
    }), _isFn(onCheck) && _isFn(onUnCheck) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: _Color.GREEN_COLOR,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_CAPTION,
      style: {
        ...S_CAPTION,
        ...captionStyle
      },
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
      style: S_SVG_CLOSE,
      onClose: onClose
    })]
  });
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
exports.default = _default;
//# sourceMappingURL=BrowserCaption.js.map