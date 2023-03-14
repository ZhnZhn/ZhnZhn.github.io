"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crStyle = require("../../zhn-utils/crStyle");
var _Button = _interopRequireDefault(require("../../zhn/Button"));
var _SvgCheckBox = _interopRequireDefault(require("../../zhn/SvgCheckBox"));
var _useRowCheckBox = _interopRequireDefault(require("./useRowCheckBox"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_CHB = 'bt-chb',
  CHECKED_COLOR = '#1b2836',
  S_ROOT = {
    padding: '6px 0 0 16px'
  },
  S_CAPTION = {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  crCaptionStyle = (captionStyle, checkedColor, value) => (0, _crStyle.crStyle3)(S_CAPTION, captionStyle, value && {
    color: checkedColor
  });
const RowCheckBoxView = _ref => {
  let {
    style,
    value,
    caption,
    captionStyle,
    checkedColor = CHECKED_COLOR,
    hCheck,
    hUnCheck
  } = _ref;
  const [TS, _hToggle] = (0, _useRowCheckBox.default)(value, hCheck, hUnCheck),
    _captionStyle = crCaptionStyle(captionStyle, checkedColor, value);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      value: value,
      color: checkedColor,
      checkedColor: TS.CHECKED_COLOR,
      onCheck: hCheck,
      onUnCheck: hUnCheck
    }), caption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      tabIndex: "-1",
      className: CL_BT_CHB,
      style: _captionStyle,
      onClick: _hToggle,
      children: caption
    })]
  });
};
var _default = RowCheckBoxView;
exports.default = _default;
//# sourceMappingURL=RowCheckBoxView.js.map