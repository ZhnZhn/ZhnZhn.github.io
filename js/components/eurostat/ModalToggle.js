"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _Modal = _interopRequireDefault(require("./Modal.Style"));

var CHECKED_COLOR = '#1b75bb';

var CheckBoxList = function CheckBoxList(_ref) {
  var selectProps = _ref.selectProps,
      crIsId = _ref.crIsId,
      _onToggle = _ref.onToggle;
  return selectProps.map(function (item) {
    return _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      key: item.id,
      initValue: true,
      rootStyle: _Modal["default"].ROW_CB,
      checkedColor: CHECKED_COLOR,
      caption: item.caption,
      onToggle: function onToggle() {
        return _onToggle(crIsId(item.id));
      }
    });
  });
};

var ModalToggle = function ModalToggle(_ref2) {
  var isShow = _ref2.isShow,
      style = _ref2.style,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? _Modal["default"].CL : _ref2$className,
      _ref2$selectProps = _ref2.selectProps,
      selectProps = _ref2$selectProps === void 0 ? [] : _ref2$selectProps,
      isShowDate = _ref2.isShowDate,
      isShowChart = _ref2.isShowChart,
      noForDate = _ref2.noForDate,
      crIsId = _ref2.crIsId,
      onToggle = _ref2.onToggle,
      toggleChart = _ref2.toggleChart,
      toggleDate = _ref2.toggleDate,
      onClose = _ref2.onClose;
  return _react["default"].createElement(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _Modal["default"].ROOT, {}, style),
    className: className,
    onClose: onClose
  }, _react["default"].createElement(CheckBoxList, {
    selectProps: selectProps,
    crIsId: crIsId,
    onToggle: onToggle
  }), _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    key: "isShowChart",
    value: isShowChart,
    rootStyle: _Modal["default"].ROW_CB,
    checkedColor: CHECKED_COLOR,
    caption: "Chart",
    onToggle: toggleChart
  }), !noForDate && _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    key: "isForDate",
    value: isShowDate,
    rootStyle: _Modal["default"].ROW_CB,
    checkedColor: CHECKED_COLOR,
    caption: "For Date",
    onToggle: toggleDate
  }));
};

var _default = ModalToggle;
exports["default"] = _default;
//# sourceMappingURL=ModalToggle.js.map