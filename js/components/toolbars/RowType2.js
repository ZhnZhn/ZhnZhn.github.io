"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));

var _SeriaConfigs = _interopRequireDefault(require("./SeriaConfigs"));

var RowType2 = function RowType2(_ref) {
  var forwardRef = _ref.forwardRef,
      caption = _ref.caption,
      initValue = _ref.initValue,
      configs = _ref.configs,
      onAdd = _ref.onAdd,
      onRemove = _ref.onRemove;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_RowCaptionInput["default"], {
    caption: caption,
    forwardRef: forwardRef,
    initValue: initValue,
    onAdd: onAdd
  }), /*#__PURE__*/_react["default"].createElement(_SeriaConfigs["default"], {
    configs: configs,
    onRemove: onRemove
  }));
};

var _default = RowType2;
exports["default"] = _default;
//# sourceMappingURL=RowType2.js.map