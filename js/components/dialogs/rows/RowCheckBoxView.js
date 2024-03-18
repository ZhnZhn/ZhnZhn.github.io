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
    chbCn,
    btCn,
    style,
    value,
    caption,
    captionStyle,
    color = COLOR,
    hCheck,
    hUnCheck
  } = _ref;
  const _captionId = (0, _uiApi.useId)(),
    _hToggle = (0, _uiApi.useCallback)(() => {
      if (value) {
        hUnCheck();
      } else {
        hCheck();
      }
    }, [value, hCheck, hUnCheck]),
    _btCn = value ? btCn : void 0,
    _captionStyle = (0, _styleFn.crStyle2)(captionStyle, !_btCn && value && {
      color
    }),
    _isCaption = !!caption;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      value: value,
      className: chbCn,
      color: color,
      labelId: _isCaption ? _captionId : void 0,
      onCheck: hCheck,
      onUnCheck: hUnCheck
    }), _isCaption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      id: _captionId,
      tabIndex: "-1",
      className: (0, _styleFn.crCn)(CL_BT_CHB, _btCn),
      style: _captionStyle,
      onClick: _hToggle,
      children: caption
    })]
  });
};
var _default = exports.default = RowCheckBoxView;
//# sourceMappingURL=RowCheckBoxView.js.map