"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const FAILED_COLOR = '#f44336',
      S_LOADING = {
  margin: '16px auto'
},
      S_LOAD_FAILED = {
  borderColor: FAILED_COLOR
},
      S_ERR_MSG = {
  color: FAILED_COLOR,
  paddingLeft: 16,
  fontWeight: 600
};

const Loading = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  "data-loader": "circle",
  style: S_LOADING
});

const LoadFailed = ({
  errMsg = ''
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "data-loader": "circle-failed",
    style: { ...S_LOADING,
      ...S_LOAD_FAILED
    }
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    style: S_ERR_MSG,
    children: errMsg + ": Network error."
  })]
});

const Load = {
  Loading,
  LoadFailed
};
var _default = Load;
exports.default = _default;
//# sourceMappingURL=Load.js.map