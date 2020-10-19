"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
};

var SpanLabel = function SpanLabel(_ref) {
  var label = _ref.label,
      style = _ref.style;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: (0, _extends2["default"])({}, S, style),
    children: label
  });
};

var _default = SpanLabel;
exports["default"] = _default;
//# sourceMappingURL=SpanLabel.js.map