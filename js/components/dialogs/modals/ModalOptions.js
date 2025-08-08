"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _inputFn = require("../../inputFn");
var _useFocus = require("../../hooks/useFocus");
var _ModalPane = _interopRequireDefault(require("../../zhn-moleculs/ModalPane"));
var _FocusTrap = _interopRequireDefault(require("../../zhn-moleculs/FocusTrap"));
var _InputText = _interopRequireDefault(require("../../zhn/InputText"));
var _SpanToken = require("../../zhn/SpanToken");
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_LABEL_ROUND_TO = {
    ..._styleFn.S_INLINE,
    margin: '8px 0'
  },
  S_CAPTION = {
    paddingRight: 4
    //fontSize: '16px'
  };
const MIN_RT = 0,
  MAX_RT = 3;
const _isRt = rt => rt === '' || rt >= MIN_RT && rt <= MAX_RT;
const ROW_CHECKBOX_CONFIGS = [["isNotZoomToMinMax", "Not Zoom to Min-Max"], ["isFilterZero", "Filter-Trim Zeros"], ["isLogarithmic", "Logarithmic Scale"]];
const ModalOptions = _ref => {
  let {
    isShow,
    style,
    className,
    dfRt,
    onRoundTo,
    toggleOption,
    onClose
  } = _ref;
  const _refFirstItem = (0, _useFocus.useFocusFirstItem)(isShow),
    _refLastItem = (0, _uiApi.useRef)(),
    _isInputRoundTo = onRoundTo && _isRt(dfRt);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    className: className,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FocusTrap.default, {
      refFirst: _refFirstItem,
      refLast: _refLastItem,
      children: [_isInputRoundTo && /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
        style: S_LABEL_ROUND_TO,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
          style: S_CAPTION,
          children: "Round Decimals to"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          ...(0, _inputFn.crInputNumberProps)(dfRt, MIN_RT, MAX_RT),
          refEl: _refFirstItem,
          onChange: onRoundTo,
          onEnter: onClose
        })]
      }), ROW_CHECKBOX_CONFIGS.map((_ref2, index) => {
        let [id, caption] = _ref2;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
          refEl: index === 0 && !_isInputRoundTo ? _refFirstItem : index === ROW_CHECKBOX_CONFIGS.length - 1 ? _refLastItem : void 0,
          style: _Style.S_ROW,
          caption: caption,
          onCheck: () => toggleOption(!0, id),
          onUnCheck: () => toggleOption(!1, id)
        }, id);
      })]
    })
  });
};
var _default = exports.default = ModalOptions;
//# sourceMappingURL=ModalOptions.js.map