"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var FAILED_COLOR = '#f44336';
var S = {
  LOADING: {
    margin: '16px auto'
  },
  LOAD_FAILED: {
    borderColor: FAILED_COLOR
  },
  ERR_MSG: {
    color: FAILED_COLOR,
    paddingLeft: 16,
    fontWeight: 600
  }
};

var Loading = function Loading() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "data-loader": "circle",
    style: S.LOADING
  });
};

var LoadFailed = function LoadFailed(_ref) {
  var _ref$errMsg = _ref.errMsg,
      errMsg = _ref$errMsg === void 0 ? '' : _ref$errMsg;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "data-loader": "circle-failed",
      style: (0, _extends2["default"])({}, S.LOADING, S.LOAD_FAILED)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S.ERR_MSG,
      children: errMsg + ": Network error."
    })]
  });
};

var Load = {
  Loading: Loading,
  LoadFailed: LoadFailed
};
var _default = Load;
exports["default"] = _default;
//# sourceMappingURL=Load.js.map