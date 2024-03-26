"use strict";

exports.__esModule = true;
exports.crSpinnerStatus = exports.SpinnerLoading = exports.Spinner = exports.LoadFailedMsg = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const SpinnerDiv = _ref => {
  let {
    style
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    "data-loader": "circle"
  });
};
const S_SPINNER_LOADING = {
  position: 'relative',
  width: 32,
  height: 32,
  margin: '32px auto 0'
};
const SpinnerLoading = _ref2 => {
  let {
    style
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerDiv, {
    style: {
      ...S_SPINNER_LOADING,
      ...style
    }
  });
};
exports.SpinnerLoading = SpinnerLoading;
const FAILED_LOAD_COLOR = '#f44336',
  S_LOAD_FAILED = {
    ...S_SPINNER_LOADING,
    borderColor: FAILED_LOAD_COLOR
  },
  S_ERR_MSG = {
    color: FAILED_LOAD_COLOR,
    padding: 16,
    fontWeight: 600
  };
const LoadFailedMsg = _ref3 => {
  let {
    errMsg = ''
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "data-loader": "circle-failed",
      style: S_LOAD_FAILED
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S_ERR_MSG,
      children: errMsg + ": Network error."
    })]
  });
};
exports.LoadFailedMsg = LoadFailedMsg;
const SPINNER_LOADING = 'L';
const SPINNER_FAILED = 'F';
const crSpinnerStatus = (isLoading, isLoadFailed) => isLoading ? SPINNER_LOADING : isLoadFailed ? SPINNER_FAILED : void 0;
exports.crSpinnerStatus = crSpinnerStatus;
const TRANSITION_DURATION = 800,
  HIDE_TIMEOUT_MLS = TRANSITION_DURATION + 200,
  S_SPINNER_TRANSITION = {
    transition: "opacity " + TRANSITION_DURATION + "ms ease-out"
  },
  S_LOADING = {
    opacity: 1
  },
  S_FAILED = {
    borderColor: FAILED_LOAD_COLOR,
    animation: 'none'
  },
  S_LOADED = {
    opacity: 0
  };
const _useIsHide = status => {
  const [isHide, setIsHide] = (0, _uiApi.useState)(false);
  (0, _uiApi.useEffect)(() => {
    if (!status) {
      setTimeout(() => setIsHide(true), HIDE_TIMEOUT_MLS);
    }
  }, [status]);
  return isHide;
};
const Spinner = _ref4 => {
  let {
    style,
    status
  } = _ref4;
  const isHide = _useIsHide(status),
    _style = status === SPINNER_LOADING ? S_LOADING : status === SPINNER_FAILED ? S_FAILED : S_LOADED;
  return isHide ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerDiv, {
    style: {
      ...S_SPINNER_TRANSITION,
      ...style,
      ..._style
    }
  });
};
exports.Spinner = Spinner;
//# sourceMappingURL=Spinner.js.map