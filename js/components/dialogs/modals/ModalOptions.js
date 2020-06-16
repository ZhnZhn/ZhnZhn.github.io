"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));

var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox"));

var _Style = _interopRequireDefault(require("./Style"));

var ModalOptions = function ModalOptions(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? _Style["default"].CL : _ref$className,
      toggleOption = _ref.toggleOption,
      onClose = _ref.onClose;

  var _toggleZoomMinMax = toggleOption.bind(null, 'isNotZoomToMinMax'),
      _toggleFilterZero = toggleOption.bind(null, 'isFilterZero');

  return /*#__PURE__*/_react["default"].createElement(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _Style["default"].ROOT, style),
    className: className,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement(_RowCheckBox["default"], {
    initValue: false,
    rootStyle: _Style["default"].ROW_CB,
    caption: "Not Zoom to Min-Max",
    onToggle: _toggleZoomMinMax
  }), /*#__PURE__*/_react["default"].createElement(_RowCheckBox["default"], {
    initValue: false,
    rootStyle: _Style["default"].ROW_CB,
    caption: "Filter Trim Zero Values",
    onToggle: _toggleFilterZero
  }));
};

var _default = ModalOptions;
exports["default"] = _default;
//# sourceMappingURL=ModalOptions.js.map