"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));

var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox"));

var _Style = _interopRequireDefault(require("./Style"));

var TOGGLE_CHECKBOX_COLOR = '#1b75bb';
var CAPTION_CHECKBOX_COLOR = '#a487d4';
var S = {
  ROW: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 3
  },
  INLINE: {
    display: 'inline-block'
  },
  CAPTION: {
    maxWidth: 150
  },
  CHB_CAPTION: {
    display: 'inline-block',
    paddingLeft: 40
  }
};

var CheckBoxList = function CheckBoxList(_ref) {
  var selectProps = _ref.selectProps,
      crIsId = _ref.crIsId,
      _onToggle = _ref.onToggle,
      onCheckCaption = _ref.onCheckCaption,
      onUnCheckCaption = _ref.onUnCheckCaption;
  return selectProps.map(function (item, index) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROW,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
        initValue: true,
        style: (0, _extends2["default"])({}, _Style["default"].ROW_CHB, S.INLINE),
        checkedColor: TOGGLE_CHECKBOX_COLOR,
        caption: item.caption,
        captionStyle: S.CAPTION,
        onToggle: function onToggle() {
          return _onToggle(crIsId(item.id));
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
        initValue: index === 0,
        style: S.CHB_CAPTION,
        checkedColor: CAPTION_CHECKBOX_COLOR,
        onCheck: function onCheck() {
          return onCheckCaption(index);
        },
        onUnCheck: function onUnCheck() {
          return onUnCheckCaption(index);
        }
      })]
    }, item.id);
  });
};

var ModalToggle = function ModalToggle(_ref2) {
  var isShow = _ref2.isShow,
      style = _ref2.style,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? _Style["default"].CL : _ref2$className,
      _ref2$selectProps = _ref2.selectProps,
      selectProps = _ref2$selectProps === void 0 ? [] : _ref2$selectProps,
      isFd = _ref2.isFd,
      isShowFd = _ref2.isShowFd,
      _ref2$isCh = _ref2.isCh,
      isCh = _ref2$isCh === void 0 ? true : _ref2$isCh,
      isShowDate = _ref2.isShowDate,
      isShowChart = _ref2.isShowChart,
      _ref2$noForDate = _ref2.noForDate,
      noForDate = _ref2$noForDate === void 0 ? false : _ref2$noForDate,
      crIsId = _ref2.crIsId,
      onToggle = _ref2.onToggle,
      onCheckCaption = _ref2.onCheckCaption,
      onUnCheckCaption = _ref2.onUnCheckCaption,
      onClose = _ref2.onClose;

  /*eslint-disable react-hooks/exhaustive-deps */
  var _toggleFd = (0, _react.useCallback)(onToggle.bind(null, 'isShowFd'), []),
      _toggleChart = (0, _react.useCallback)(onToggle.bind(null, 'isShowChart'), []),
      _toggleDate = (0, _react.useCallback)(onToggle.bind(null, 'isShowDate'), []);
  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _Style["default"].ROOT, style),
    className: className,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckBoxList, {
      selectProps: selectProps,
      crIsId: crIsId,
      onToggle: onToggle,
      onCheckCaption: onCheckCaption,
      onUnCheckCaption: onUnCheckCaption
    }), isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      value: isShowFd,
      style: _Style["default"].ROW_CHB,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: "From Date",
      onToggle: _toggleFd
    }, "isShowFd"), isCh && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      value: isShowChart,
      style: _Style["default"].ROW_CHB,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: "Chart",
      onToggle: _toggleChart
    }, "isShowChart"), !noForDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      value: isShowDate,
      style: _Style["default"].ROW_CHB,
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: "For Date",
      onToggle: _toggleDate
    }, "isForDate")]
  });
};

var _default = ModalToggle;
exports["default"] = _default;
//# sourceMappingURL=ModalToggle.js.map