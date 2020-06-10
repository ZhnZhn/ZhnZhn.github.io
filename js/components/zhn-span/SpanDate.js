"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var STYLE = {
  ROOT: {
    color: '#FDB316',
    fontWeight: 'bold'
  }
};

var SpanDate = function SpanDate(_ref) {
  var date = _ref.date,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, STYLE.ROOT, style)
  }, date);
};

var _default = SpanDate;
exports["default"] = _default;
//# sourceMappingURL=SpanDate.js.map