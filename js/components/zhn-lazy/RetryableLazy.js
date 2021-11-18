"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _jsxRuntime = require("react/jsx-runtime");

const DfLoaderView = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: "Loading..."
});

const DfErrorRetryView = ({
  retry
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  onClick: retry,
  children: "Retry"
});

const crRetryableLazy = (crLoadPromise, LoaderView = DfLoaderView, ErrorRetryView = DfErrorRetryView) => {
  const RetryableLazy = props => {
    const [loading, retry, setLoadingFalse] = (0, _useBool.default)(true)
    /*eslint-disable react-hooks/exhaustive-deps */
    ,
          LazyComponent = (0, _react.useMemo)(() => /*#__PURE__*/(0, _react.lazy)(() => crLoadPromise().catch(() => {
      setLoadingFalse();
      return {
        default: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorRetryView, {
          retry: retry
        })
      };
    })), [loading]); // crLoadPromise, retry

    /*eslint-enable react-hooks/exhaustive-deps */

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(LoaderView, {}),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LazyComponent, { ...props
      })
    });
  };

  return RetryableLazy;
};

var _default = crRetryableLazy;
exports.default = _default;
//# sourceMappingURL=RetryableLazy.js.map