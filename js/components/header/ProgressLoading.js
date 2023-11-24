"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _loadingStore = require("../../flux/stores/loadingStore");
var _LoadingProgressActions = require("../../flux/actions/LoadingProgressActions");
var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));
var _jsxRuntime = require("react/jsx-runtime");
const COLOR_LOADING = '#2f7ed8',
  COLOR_FAILED = '#ed5813';
const ProgressLoading = (0, _memoEqual.default)(() => {
  const status = (0, _loadingStore.useLoading)(),
    [completed, color] = status === _LoadingProgressActions.LPAT_LOADING ? [35, COLOR_LOADING] : status === _LoadingProgressActions.LPAT_LOADING_COMPLETE ? [100, COLOR_LOADING] : status === _LoadingProgressActions.LPAT_LOADING_FAILED ? [100, COLOR_FAILED] : [0, COLOR_LOADING];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine.default, {
    completed: completed,
    color: color
  });
});
var _default = exports.default = ProgressLoading;
//# sourceMappingURL=ProgressLoading.js.map