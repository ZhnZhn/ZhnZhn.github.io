"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var STYLE = {
  ROOT: {
    color: '#2F7ED8',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }
};

var SpanValue = function SpanValue(_ref) {
  var value = _ref.value,
      style = _ref.style;
  return _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, STYLE.ROOT, {}, style)
  }, value);
};

var _default = SpanValue;
exports["default"] = _default;
//# sourceMappingURL=SpanValue.js.map