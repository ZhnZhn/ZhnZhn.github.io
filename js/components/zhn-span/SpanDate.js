"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  color: '#fdb316',
  fontWeight: 'bold'
};

var SpanDate = function SpanDate(_ref) {
  var date = _ref.date,
      style = _ref.style;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: (0, _extends2["default"])({}, S, style),
    children: date
  });
};

var _default = SpanDate;
exports["default"] = _default;
//# sourceMappingURL=SpanDate.js.map