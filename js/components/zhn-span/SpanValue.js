"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var S = {
  color: '#2f7ed8',
  fontWeight: 'bold',
  whiteSpace: 'nowrap'
};

var SpanValue = function SpanValue(_ref) {
  var value = _ref.value,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S, style)
  }, value);
};

var _default = SpanValue;
exports["default"] = _default;
//# sourceMappingURL=SpanValue.js.map