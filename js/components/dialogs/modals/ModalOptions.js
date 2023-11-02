"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiTheme = require("../../styles/uiTheme");
var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));
var _InputText = _interopRequireDefault(require("../../zhn/InputText"));
var _SpanBlack = _interopRequireDefault(require("../../zhn/SpanBlack"));
var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox2"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV_INPUT = {
  margin: '6px 0'
};
const S_CAPTION = {
  paddingRight: 4,
  fontSize: '16px',
  fontWeight: 'bold'
};
const MIN_RT = 0,
  MAX_RT = 3;
const _isRt = rt => rt === '' || rt >= MIN_RT && rt <= MAX_RT;
const ROW_CHECKBOX_CONFIGS = [["isNotZoomToMinMax", "Not Zoom to Min-Max"], ["isFilterZero", "Filter-Trim Zeros"], ["isLogarithmic", "Logarithmic Scale"]];
const ModalOptions = _ref => {
  let {
    isShow,
    style,
    className = _Style.CL_POPUP_MENU,
    dfRt,
    onRoundTo,
    toggleOption,
    onClose
  } = _ref;
  const _colorBlack = (0, _uiTheme.getColorBlack)();
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
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanBlack.default, {
          style: S_CAPTION,
          children: "Round Decimals to"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          type: "number",
          initValue: dfRt,
          min: MIN_RT,
          max: MAX_RT,
          step: 1,
          maxLength: 2,
          onChange: onRoundTo,
          onEnter: onClose
        })]
      })
    }), ROW_CHECKBOX_CONFIGS.map(_ref2 => {
      let [id, caption] = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        id: id,
        style: _Style.S_ROW,
        color: _colorBlack,
        caption: caption,
        onToggle: toggleOption
      }, id);
    })]
  });
};
var _default = exports.default = ModalOptions;
//# sourceMappingURL=ModalOptions.js.map