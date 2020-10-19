"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  color: '#2f7ed8',
  fontWeight: 'bold',
  whiteSpace: 'nowrap'
};

var SpanValue = function SpanValue(_ref) {
  var value = _ref.value,
      style = _ref.style;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: (0, _extends2["default"])({}, S, style),
    children: value
  });
};

var _default = SpanValue;
exports["default"] = _default;
//# sourceMappingURL=SpanValue.js.map