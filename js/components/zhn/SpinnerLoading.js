"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    textAlign: 'middle',
    margin: '32px auto 0'
  }
};

var SpinnerLoading = function SpinnerLoading(_ref) {
  var style = _ref.style;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: (0, _extends2["default"])({}, S.SPINNER_LOADING, style),
    "data-loader": "circle"
  });
};

var _default = SpinnerLoading;
exports["default"] = _default;
//# sourceMappingURL=SpinnerLoading.js.map