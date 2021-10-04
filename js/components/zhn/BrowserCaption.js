"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Color = _interopRequireDefault(require("../styles/Color"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _SvgMore = _interopRequireDefault(require("./SvgMore"));

var _SvgCheckBox = _interopRequireDefault(require("./SvgCheckBox"));

var _SvgClose = _interopRequireDefault(require("./SvgClose"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const TH_ID = 'ELEMENT';
const CL_BR_CAPTION = 'br-caption text-clip gap-right',
      CL_NOT_SELECTED = 'not-selected';
const S_CAPTION = {
  position: 'relative',
  top: 6,
  paddingRight: 8,
  fontSize: '18px',
  fontWeight: '500'
},
      S_BT_MORE = {
  position: 'relative',
  top: 3
},
      S_CHECK_BOX = {
  margin: '0 10px 0 6px'
},
      S_SVG_CLOSE = {
  position: 'absolute',
  top: 6,
  right: 0
};

const _isFn = fn => typeof fn === 'function';

const BrowserCaption = ({
  style,
  captionStyle,
  caption,
  children,
  onMore,
  onCheck,
  onUnCheck,
  onClose
}) => {
  const TS = (0, _useTheme.default)(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_BR_CAPTION,
    style: { ...style,
      ...TS.ROOT
    },
    children: [_isFn(onMore) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      style: S_BT_MORE,
      onClick: onMore
    }), _isFn(onCheck) && _isFn(onUnCheck) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: _Color.default.GREEN,
      checkedColor: TS.ROOT.backgroundColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_NOT_SELECTED,
      style: { ...S_CAPTION,
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