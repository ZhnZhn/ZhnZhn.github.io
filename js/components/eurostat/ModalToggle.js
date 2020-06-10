"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _Modal = _interopRequireDefault(require("./Modal.Style"));

var TOGGLE_CHECKBOX_COLOR = '#1b75bb';
var CAPTION_CHECKBOX_COLOR = '#a487d4';
var S = {
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
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
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROW,
      key: item.id
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: true,
      rootStyle: (0, _extends2["default"])({}, _Modal["default"].ROW_CB, S.INLINE),
      checkedColor: TOGGLE_CHECKBOX_COLOR,
      caption: item.caption,
      captionStyle: S.CAPTION,
      onToggle: function onToggle() {
        return _onToggle(crIsId(item.id));
      }
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: index === 0,
      rootStyle: S.CHB_CAPTION,
      checkedColor: CAPTION_CHECKBOX_COLOR,
      onCheck: function onCheck() {
        return onCheckCaption(index);
      },
      onUnCheck: function onUnCheck() {
        return onUnCheckCaption(index);
      }
    }));
  });
};

var ModalToggle = function ModalToggle(_ref2) {
  var isShow = _ref2.isShow,
      style = _ref2.style,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? _Modal["default"].CL : _ref2$className,
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

  var _toggleFd = (0, _react.useCallback)(onToggle.bind(null, 'isShowFd'), []),
      _toggleChart = (0, _react.useCallback)(onToggle.bind(null, 'isShowChart'), []),
      _toggleDate = (0, _react.useCallback)(onToggle.bind(null, 'isShowDate'), []);

  return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ModalPopup, {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _Modal["default"].ROOT, style),
    className: className,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement(CheckBoxList, {
    selectProps: selectProps,
    crIsId: crIsId,
    onToggle: onToggle,
    onCheckCaption: onCheckCaption,
    onUnCheckCaption: onUnCheckCaption
  }), isFd && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    key: "isShowFd",
    value: isShowFd,
    rootStyle: _Modal["default"].ROW_CB,
    checkedColor: TOGGLE_CHECKBOX_COLOR,
    caption: "From Date",
    onToggle: _toggleFd
  }), isCh && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    key: "isShowChart",
    value: isShowChart,
    rootStyle: _Modal["default"].ROW_CB,
    checkedColor: TOGGLE_CHECKBOX_COLOR,
    caption: "Chart",
    onToggle: _toggleChart
  }), !noForDate && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    key: "isForDate",
    value: isShowDate,
    rootStyle: _Modal["default"].ROW_CB,
    checkedColor: TOGGLE_CHECKBOX_COLOR,
    caption: "For Date",
    onToggle: _toggleDate
  }));
};

var _default = ModalToggle;
exports["default"] = _default;
//# sourceMappingURL=ModalToggle.js.map