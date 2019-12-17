"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));

var _useRowOptions2 = _interopRequireDefault(require("./useRowOptions"));

var RowInputSelect = function RowInputSelect(props) {
  var _useRowOptions = (0, _useRowOptions2["default"])(props),
      rowStyle = _useRowOptions.rowStyle,
      labelStyle = _useRowOptions.labelStyle,
      caption = _useRowOptions.caption,
      options = _useRowOptions.options;

  return _react["default"].createElement("div", {
    style: rowStyle
  }, _react["default"].createElement("span", {
    style: labelStyle
  }, caption), _react["default"].createElement(_InputSelect["default"], options));
};

var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map