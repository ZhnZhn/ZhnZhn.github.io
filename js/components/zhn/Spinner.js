"use strict";

exports.__esModule = true;
exports.crSpinnerStatus = exports.SpinnerLoading = exports.Spinner = exports.LoadFailedMsg = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const SpinnerDiv = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: props.style,
  "data-loader": "circle"
});
const S_SPINNER = {
  position: 'relative',
  width: 32,
  height: 32,
  margin: '32px auto 0'
};
const SpinnerLoading = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerDiv, {
  style: {
    ...S_SPINNER,
    ...props.style
  }
});
exports.SpinnerLoading = SpinnerLoading;
const FAILED_LOAD_COLOR = '#f44336',
  CL_ERR_MSG = 'err-msg',
  S_ERR_MSG = {
    padding: 16
  };
const LoadFailedMsg = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "data-loader": "circle-failed",
    style: S_SPINNER
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: CL_ERR_MSG,
    style: S_ERR_MSG,
    children: `${props.errMsg || ''}: Network error.`
  })]
});
exports.LoadFailedMsg = LoadFailedMsg;
const SPINNER_LOADING = 'L';
const SPINNER_FAILED = 'F';
const crSpinnerStatus = (isLoading, isLoadFailed) => isLoading ? SPINNER_LOADING : isLoadFailed ? SPINNER_FAILED : void 0;
exports.crSpinnerStatus = crSpinnerStatus;
const TRANSITION_DURATION = 800,
  HIDE_TIMEOUT_MLS = TRANSITION_DURATION + 200,
  S_SPINNER_TRANSITION = {
    transition: `opacity ${TRANSITION_DURATION}ms ease-out`
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
const useIsHide = status => {
  const [isHide, setIsHide] = (0, _uiApi.useState)(!1);
  (0, _uiApi.useEffect)(() => {
    if (!status) {
      setTimeout(() => setIsHide(!0), HIDE_TIMEOUT_MLS);
    }
  }, [status]);
  return isHide;
};
const Spinner = _ref => {
  let {
    style,
    status
  } = _ref;
  const isHide = useIsHide(status),
    _style = status === SPINNER_LOADING ? S_LOADING : status === SPINNER_FAILED ? S_FAILED : S_LOADED;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
    v: isHide,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerDiv, {
      style: {
        ...S_SPINNER_TRANSITION,
        ...style,
        ..._style
      }
    })
  });
};
exports.Spinner = Spinner;
//# sourceMappingURL=Spinner.js.map