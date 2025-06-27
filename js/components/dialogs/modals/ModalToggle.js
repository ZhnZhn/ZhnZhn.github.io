"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _styleFn = require("../../styleFn");
var _ItemStack = _interopRequireDefault(require("../../zhn/ItemStack"));
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _ModalPopupInputs = _interopRequireDefault(require("./ModalPopupInputs"));
var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox1"));
var _RowCheckBox2 = _interopRequireDefault(require("../rows/RowCheckBox3"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_FLEX = {
    ..._Style.S_ROW,
    ..._styleFn.S_FLEX,
    justifyContent: 'space-between'
  },
  S_CHB_CAPTION = {
    ..._styleFn.S_INLINE,
    padding: '0 0 0 40px'
  };
const _crChbToggleInitValue = isRow => (0, _isTypeFn.isBool)(isRow) ? isRow : !0;
const _crCheckBoxItem = (item, index, _ref) => {
  let {
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW_FLEX,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      initialValue: _crChbToggleInitValue(item.isRow),
      style: _Style.S_INPUT_SWITCH,
      caption: item.caption,
      onCheck: () => onToggle(item.id, !0),
      onUnCheck: () => onToggle(item.id, !1)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      style: S_CHB_CAPTION,
      color: _Style.TOGGLE_CAPTION_CHECKBOX_COLOR,
      initialValue: index === 0,
      onCheck: () => onCheckCaption(index),
      onUnCheck: () => onUnCheckCaption(index)
    })]
  }, item.id);
};
const ModalToggle = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopupInputs.default, {
  ...props,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: props.selectProps,
    crItem: _crCheckBoxItem,
    onToggle: props.onToggle,
    onCheckCaption: props.onCheckCaption,
    onUnCheckCaption: props.onUnCheckCaption
  }), props.isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox2.default, {
    style: _Style.S_ROW_INPUT_SWITCH,
    caption: "From Date",
    value: props.isShowFd,
    onToggle: props.onToggleFd
  }, "isShowFd"), props.isCh && props.onToggleChart && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox2.default, {
    style: _Style.S_ROW_INPUT_SWITCH,
    caption: "Chart",
    value: props.isShowChart,
    onToggle: props.onToggleChart
  }, "isShowChart")]
});
var _default = exports.default = ModalToggle;
//# sourceMappingURL=ModalToggle.js.map