"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const S_SPINNER_LOADING = {
  position: 'relative',
  display: 'block',
  width: 32,
  height: 32,
  textAlign: 'middle',
  margin: '32px auto 0'
};

const SpinnerLoading = ({
  style
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: { ...S_SPINNER_LOADING,
    ...style
  },
  "data-loader": "circle"
});

var _default = SpinnerLoading;
exports.default = _default;
//# sourceMappingURL=SpinnerLoading.js.map