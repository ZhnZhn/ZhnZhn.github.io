"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = require("../../zhn-moleculs/ModalPopup");
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const ModalPopupInputsView = props => {
  const [refFirstItem, refLastItem] = (0, _ModalPopup.useModalPopup)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      refEl: refFirstItem,
      style: _Style.S_ROW_INPUT_SWITCH,
      caption: "Input Labels",
      initialValue: props.isShowLabels,
      onToggle: props.onToggleLabels
    }, "isShowLabels"), props.children(refLastItem)]
  });
};
var _default = exports.default = ModalPopupInputsView;
//# sourceMappingURL=ModalPopupInputsView.js.map