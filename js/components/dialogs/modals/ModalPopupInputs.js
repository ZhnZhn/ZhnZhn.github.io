"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useFocus = require("../../hooks/useFocus");
var _ModalPane = _interopRequireDefault(require("../../zhn-moleculs/ModalPane"));
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const ModalPopupInputs = props => {
  const _refFirstItem = (0, _uiApi.useRef)();
  (0, _useFocus.useAsyncFocusFirstItemIf)(props.isShow, _refFirstItem);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPane.default, {
    isShow: props.isShow,
    className: props.className,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...props.style
    },
    onClose: props.onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      refEl: _refFirstItem,
      style: _Style.S_ROW_INPUT_SWITCH,
      caption: "Input Labels",
      initialValue: props.isShowLabels,
      onToggle: props.onToggleLabels
    }, "isShowLabels"), props.children]
  });
};
var _default = exports.default = ModalPopupInputs;
//# sourceMappingURL=ModalPopupInputs.js.map