"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const ModalPopupInputs = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
  isShow: props.isShow,
  style: {
    ..._Style.S_MODAL_POPUP,
    ...props.style
  },
  className: props.className,
  onClose: props.onClose,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
    style: _Style.S_ROW_INPUT_SWITCH,
    caption: "Input Labels",
    initialValue: props.isShowLabels,
    onToggle: props.onToggleLabels
  }, "isShowLabels"), props.children]
});
var _default = exports.default = ModalPopupInputs;
//# sourceMappingURL=ModalPopupInputs.js.map