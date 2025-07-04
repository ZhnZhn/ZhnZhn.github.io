"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _ModalPopupInputs = _interopRequireDefault(require("./ModalPopupInputs"));
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const ModalToggleInputs = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopupInputs.default, {
  ...props,
  children: (0, _uiApi.safeMap)(props.configs, config => /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
    style: _Style.S_ROW_INPUT_SWITCH,
    caption: config[0],
    initialValue: config[1],
    onToggle: config[2]
  }, config[0]))
});
var _default = exports.default = ModalToggleInputs;
//# sourceMappingURL=ModalToggleInputs.js.map