"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _styleFn = require("../../styleFn");
var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));
var _ItemStack = _interopRequireDefault(require("../../zhn/ItemStack"));
var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox1"));
var _RowCheckBox2 = _interopRequireDefault(require("../rows/RowCheckBox2"));
var _RowCheckBox3 = _interopRequireDefault(require("../rows/RowCheckBox3"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_FLEX = {
    ..._Style.S_ROW,
    ..._styleFn.S_FLEX,
    justifyContent: 'space-between'
  },
  S_CAPTION = {
    maxWidth: 150,
    textAlign: 'left'
  },
  S_CHB_TOGGLE = {
    ..._styleFn.S_INLINE,
    padding: void 0
  },
  S_CHB_CAPTION = {
    ..._styleFn.S_INLINE,
    padding: '0 0 0 40px'
  };
const _crChbToggleInitValue = isRow => (0, _isTypeFn.isBool)(isRow) ? isRow : true;
const _crCheckBoxItem = (item, index, _ref) => {
  let {
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW_FLEX,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox2.default, {
      initialValue: _crChbToggleInitValue(item.isRow),
      style: S_CHB_TOGGLE,
      color: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: item.caption,
      captionStyle: S_CAPTION,
      onToggle: () => onToggle(item.id)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      style: S_CHB_CAPTION,
      color: _Style.TOGGLE_CAPTION_CHECKBOX_COLOR,
      initialValue: index === 0,
      onCheck: () => onCheckCaption(index),
      onUnCheck: () => onUnCheckCaption(index)
    })]
  }, item.id);
};
const ModalToggle = _ref2 => {
  let {
    isShow,
    style,
    className,
    selectProps,
    isShowLabels,
    isFd,
    isShowFd,
    isCh,
    isShowChart,
    onToggleLabels,
    onToggle,
    onCheckCaption,
    onUnCheckCaption,
    onToggleFd,
    onToggleChart,
    onClose
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    isShow: isShow,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...style
    },
    className: className,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox3.default, {
      style: _Style.S_ROW,
      color: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: "Input Labels",
      value: isShowLabels,
      onToggle: onToggleLabels
    }, "isShowLabels"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: selectProps,
      crItem: _crCheckBoxItem,
      onToggle: onToggle,
      onCheckCaption: onCheckCaption,
      onUnCheckCaption: onUnCheckCaption
    }), isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox3.default, {
      style: _Style.S_ROW,
      color: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: "From Date",
      value: isShowFd,
      onToggle: onToggleFd
    }, "isShowFd"), isCh && onToggleChart && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox3.default, {
      style: _Style.S_ROW,
      color: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: "Chart",
      value: isShowChart,
      onToggle: onToggleChart
    }, "isShowChart")]
  });
};
var _default = exports.default = ModalToggle;
//# sourceMappingURL=ModalToggle.js.map