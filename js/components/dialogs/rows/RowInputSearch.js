"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputSearch = _interopRequireDefault(require("../../zhn-search/InputSearch"));

var _crRowOptions2 = _interopRequireDefault(require("./crRowOptions"));

var RowInputSearch = function RowInputSearch(props) {
  var _crRowOptions = (0, _crRowOptions2["default"])(props),
      rowStyle = _crRowOptions.rowStyle,
      labelStyle = _crRowOptions.labelStyle,
      caption = _crRowOptions.caption,
      options = _crRowOptions.options;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: rowStyle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: labelStyle
  }, caption), /*#__PURE__*/_react["default"].createElement(_InputSearch["default"], options));
};

var _default = RowInputSearch;
exports["default"] = _default;
//# sourceMappingURL=RowInputSearch.js.map