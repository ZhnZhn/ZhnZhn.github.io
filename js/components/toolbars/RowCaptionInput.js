"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _A = _interopRequireDefault(require("../zhn/A"));

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 56,
    marginRight: 12
  }
};

var RowCaptionInput = function RowCaptionInput(_ref) {
  var caption = _ref.caption,
      forwardRef = _ref.forwardRef,
      initValue = _ref.initValue,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? 3 : _ref$maxLength,
      onAdd = _ref.onAdd;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: S.CAPTION
  }, caption), /*#__PURE__*/_react["default"].createElement(_A["default"].InputText, {
    ref: forwardRef,
    type: "number",
    style: S.INPUT_TEXT,
    initValue: initValue,
    maxLength: maxLength,
    onEnter: onAdd
  }), /*#__PURE__*/_react["default"].createElement(_A["default"].SvgPlus, {
    onClick: onAdd
  }));
};

var _default = RowCaptionInput;
exports["default"] = _default;
//# sourceMappingURL=RowCaptionInput.js.map