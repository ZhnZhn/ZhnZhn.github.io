"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _SpinnerStatus = require("./SpinnerStatus");
var _jsxRuntime = require("react/jsx-runtime");
const S_LOADING = {
    position: 'absolute',
    top: 80,
    left: '45%',
    zIndex: 10,
    display: 'block',
    width: 32,
    height: 32,
    opacity: 1,
    transition: 'opacity 800ms ease-out'
  },
  S_FAILED = {
    borderColor: '#f44336',
    animation: 'none'
  },
  S_LOADED = {
    opacity: 0
  };
const _useIsHide = status => {
  const [isHide, setIsHide] = (0, _uiApi.useState)(false);
  (0, _uiApi.useEffect)(() => {
    if (!status) {
      setTimeout(() => setIsHide(true), 1000);
    }
  }, [status]);
  return isHide;
};
const Spinner = _ref => {
  let {
    style,
    status
  } = _ref;
  const isHide = _useIsHide(status),
    _style = status === _SpinnerStatus.LOADING ? S_LOADING : status === _SpinnerStatus.FAILED ? S_FAILED : S_LOADED;
  return isHide ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      ...S_LOADING,
      ...style,
      ..._style
    },
    "data-loader": "circle"
  });
};
var _default = Spinner;
exports.default = _default;
//# sourceMappingURL=Spinner.js.map