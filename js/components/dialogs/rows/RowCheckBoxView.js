"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _Button = _interopRequireDefault(require("../../zhn/Button"));
var _SvgCheckBox = _interopRequireDefault(require("../../zhn/SvgCheckBox"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_CHB = 'bt-chb',
  COLOR = '#1b2836',
  S_ROOT = {
    padding: '6px 0 0 16px'
  };
const RowCheckBoxView = _ref => {
  let {
    style,
    value,
    caption,
    captionStyle,
    color = COLOR,
    hCheck,
    hUnCheck
  } = _ref;
  const _hToggle = (0, _uiApi.useCallback)(() => {
      if (value) {
        hUnCheck();
      } else {
        hCheck();
      }
    }, [value, hCheck, hUnCheck]),
    _captionStyle = (0, _styleFn.crStyle2)(captionStyle, value && {
      color
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      value: value,
      color: color,
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