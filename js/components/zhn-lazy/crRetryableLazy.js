"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = require("../hooks/useBool");
var _jsxRuntime = require("react/jsx-runtime");
const S_LOADING = {
    color: '#2f7ed8'
  },
  CL_BT = 'bt',
  S_RETRY = {
    color: '#1b2836'
  };
const DfLoaderView = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: S_LOADING,
  children: "Loading..."
});
const DfErrorRetryView = _ref => {
  let {
    retry
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_BT,
    style: S_RETRY,
    onClick: retry,
    children: "Retry"
  });
};
const crRetryableLazy = function (crLoadPromise, LoaderView, ErrorRetryView) {
  if (LoaderView === void 0) {
    LoaderView = DfLoaderView;
  }
  if (ErrorRetryView === void 0) {
    ErrorRetryView = DfErrorRetryView;
  }
  const RetryableLazy = props => {
    const [loading, retry, setLoadingFalse] = (0, _useBool.useBool)(true)
      /*eslint-disable react-hooks/exhaustive-deps */,
      LazyComponent = (0, _uiApi.useMemo)(() => (0, _uiApi.lazy)(() => crLoadPromise().catch(() => {
        setLoadingFalse();
        return {
          default: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorRetryView, {
            retry: retry
          })
        };
      })), [loading]);
    // crLoadPromise, retry
    /*eslint-enable react-hooks/exhaustive-deps */

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(LoaderView, {}),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LazyComponent, {
        ...props
      })
    });
  };
  return RetryableLazy;
};
var _default = exports.default = crRetryableLazy;
//# sourceMappingURL=crRetryableLazy.js.map