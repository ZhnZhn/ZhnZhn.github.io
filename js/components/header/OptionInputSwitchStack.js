"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV_OPTIONS = {
    padding: '4px 12px 8px 22px'
  },
  S_INPUT_SWITCH = {
    paddingTop: 12
  };
const OptionInputSwitchStack = _ref => {
  let {
    data,
    configs
  } = _ref;
  const _hMode = (fnName, mode) => (0, _getFnByPropName.default)(data, fnName)(mode);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_DIV_OPTIONS,
    children: configs.map(_ref2 => {
      let [caption, id] = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
        style: S_INPUT_SWITCH,
        caption: caption,
        initialValue: (0, _getFnByPropName.default)(data, id, !1)(),
        onCheck: (0, _uiApi.bindTo)(_hMode, id, !0),
        onUnCheck: (0, _uiApi.bindTo)(_hMode, id, !1)
      }, caption);
    })
  });
};
var _default = exports.default = OptionInputSwitchStack;
//# sourceMappingURL=OptionInputSwitchStack.js.map