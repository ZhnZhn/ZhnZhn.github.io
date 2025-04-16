"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _SvgMore = _interopRequireDefault(require("./SvgMore"));
var _SvgCheckBox = _interopRequireDefault(require("./SvgCheckBox"));
var _BtSvgX = require("./BtSvgX");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_TEXT_CLIP = 'text-clip',
  CL_BR_CAPTION = (0, _styleFn.crElementCn)(`br-caption ${CL_TEXT_CLIP} gap-right`),
  CL_CAPTION = (0, _styleFn.crNotSelectedCn)(CL_TEXT_CLIP),
  S_CAPTION = {
    paddingRight: 8,
    fontSize: '18px',
    fontWeight: '500'
  },
  S_CHECK_BOX = {
    position: 'relative',
    top: -3,
    margin: '0 10px 0 6px'
  };
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
  const captionId = (0, _uiApi.useId)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_BR_CAPTION,
    style: style,
    children: [(0, _uiApi.isFn)(onMore) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      style: svgMoreStyle,
      onClick: onMore
    }), (0, _uiApi.isFn)(onCheck) && (0, _uiApi.isFn)(onUnCheck) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: _Color.GREEN_COLOR,
      labelId: captionId,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      id: captionId,
      className: CL_CAPTION,
      style: {
        ...S_CAPTION,
        ...captionStyle
      },
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      onClick: onClose
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
var _default = exports.default = BrowserCaption;
//# sourceMappingURL=BrowserCaption.js.map