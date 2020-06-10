"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputSearch = _interopRequireDefault(require("../../zhn-search/InputSearch"));

var _useRowOptions2 = _interopRequireDefault(require("./useRowOptions"));

var RowInputSearch = function RowInputSearch(props) {
  var _useRowOptions = (0, _useRowOptions2["default"])(props),
      rowStyle = _useRowOptions.rowStyle,
      labelStyle = _useRowOptions.labelStyle,
      caption = _useRowOptions.caption,
      options = _useRowOptions.options;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: rowStyle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: labelStyle
  }, caption), /*#__PURE__*/_react["default"].createElement(_InputSearch["default"], options));
};

var _default = RowInputSearch;
exports["default"] = _default;
//# sourceMappingURL=RowInputSearch.js.map