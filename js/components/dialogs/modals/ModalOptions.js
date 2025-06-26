"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _inputFn = require("../../inputFn");
var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));
var _InputText = _interopRequireDefault(require("../../zhn/InputText"));
var _SpanToken = require("../../zhn/SpanToken");
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV_INPUT = {
    margin: '6px 0 10px 0'
  },
  S_CAPTION = {
    paddingRight: 4,
    fontSize: '16px'
  },
  S_WIDTH_110 = {
    width: '110%'
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    isShow: isShow,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...style
    },
    className: className,
    onClose: onClose,
    children: [onRoundTo && _isRt(dfRt) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DIV_INPUT,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
          style: S_CAPTION,
          children: "Round Decimals to"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          ...(0, _inputFn.crInputNumberProps)(dfRt, MIN_RT, MAX_RT),
          onChange: onRoundTo,
          onEnter: onClose
        })]
      })
    }), ROW_CHECKBOX_CONFIGS.map(_ref2 => {
      let [id, caption] = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
        style: {
          ..._Style.S_ROW,
          ...S_WIDTH_110
        },
        caption: caption,
        onCheck: () => toggleOption(!0, id),
        onUnCheck: () => toggleOption(!1, id)
      }, id);
    })]
  });
};
var _default = exports.default = ModalOptions;
//# sourceMappingURL=ModalOptions.js.map