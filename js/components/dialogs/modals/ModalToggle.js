"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));

var _ItemStack = _interopRequireDefault(require("../../zhn/ItemStack"));

var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox"));

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const TOGGLE_CHECKBOX_COLOR = '#1b75bb',
      CAPTION_CHECKBOX_COLOR = '#a487d4',
      S_ROW = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 3
},
      S_CAPTION = {
  maxWidth: 150,
  paddingBottom: 2,
  textAlign: 'left',
  verticalAlign: 'middle'
},
      S_CHB_TOGGLE = { ..._Style.S_ROW_CHB,
  display: 'inline-block'
},
      S_CHB_CAPTION = {
  display: 'inline-block',
  paddingTop: 2,
  paddingLeft: 40
};

const _crChbToggleInitValue = isRow => typeof isRow === 'boolean' ? isRow : true;

const _crCheckBoxItem = (item, index, _ref) => {
  let {
    crIsId,
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: _crChbToggleInitValue(item.isRow),
      style: S_CHB_TOGGLE,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: item.caption,
      captionStyle: S_CAPTION,
      onToggle: () => onToggle(crIsId(item.id))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: index === 0,
      style: S_CHB_CAPTION,
      checkedColor: CAPTION_CHECKBOX_COLOR,
      onCheck: () => onCheckCaption(index),
      onUnCheck: () => onUnCheckCaption(index)
    })]
  }, item.id);
};
/*eslint-disable react-hooks/exhaustive-deps */


const _useToggleByPropName = (onToggle, propName) => (0, _react.useCallback)(onToggle.bind(null, propName), []); //onToggle, propName

/*eslint-enable react-hooks/exhaustive-deps */


const ModalToggle = _ref2 => {
  let {
    isShow,
    style,
    className = _Style.CL_POPUP_MENU,
    selectProps,
    isFd,
    isShowFd,
    isCh = true,
    isShowDate,
    isShowChart,
    crIsId,
    onToggle,
    onCheckCaption,
    onUnCheckCaption,
    onClose
  } = _ref2;

  const _toggleFd = _useToggleByPropName(onToggle, 'isShowFd'),
        _toggleChart = _useToggleByPropName(onToggle, 'isShowChart');

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    isShow: isShow,
    style: { ..._Style.S_MODAL_POPUP,
      ...style
    },
    className: className,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: selectProps,
      crItem: _crCheckBoxItem,
      crIsId: crIsId,
      onToggle: onToggle,
      onCheckCaption: onCheckCaption,
      onUnCheckCaption: onUnCheckCaption
    }), isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      value: isShowFd,
      style: _Style.S_ROW_CHB,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: "From Date",
      onToggle: _toggleFd
    }, "isShowFd"), isCh && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      value: isShowChart,
      style: _Style.S_ROW_CHB,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: "Chart",
      onToggle: _toggleChart
    }, "isShowChart")]
  });
};

var _default = ModalToggle;
exports.default = _default;
//# sourceMappingURL=ModalToggle.js.map