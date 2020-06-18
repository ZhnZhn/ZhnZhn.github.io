"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));

var _crRowOptions2 = _interopRequireDefault(require("./crRowOptions"));

var RowInputSelect = function RowInputSelect(props) {
  var _crRowOptions = (0, _crRowOptions2["default"])(props),
      rowStyle = _crRowOptions.rowStyle,
      labelStyle = _crRowOptions.labelStyle,
      caption = _crRowOptions.caption,
      options = _crRowOptions.options;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: rowStyle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: labelStyle
  }, caption), /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], options));
};

var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map