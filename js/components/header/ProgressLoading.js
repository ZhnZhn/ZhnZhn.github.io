"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _LoadingProgressActions = require("../../flux/actions/LoadingProgressActions");

var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));

var _jsxRuntime = require("react/jsx-runtime");

const COLOR_LOADING = '#2f7ed8',
      COLOR_FAILED = '#ed5813',
      COMPLETE_TIMEOUT_MLS = 450;

const _crState = (completed, color) => [completed, color];

const ProgressLoading = () => {
  const [state, setState] = (0, _react.useState)(() => _crState(0, COLOR_LOADING)),
        [completed, color] = state;
  (0, _useListen.default)(actionType => {
    if (actionType === _LoadingProgressActions.LPAT_LOADING) {
      setState(_crState(35, COLOR_LOADING));
    } else if (actionType === _LoadingProgressActions.LPAT_LOADING_COMPLETE) {
      setTimeout(() => setState(_crState(100, COLOR_LOADING)), COMPLETE_TIMEOUT_MLS);
    } else if (actionType === _LoadingProgressActions.LPAT_LOADING_FAILED) {
      setState(_crState(100, COLOR_FAILED));
    }
  }, 'listenLoadingProgress');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine.default, {
    height: 3,
    color: color,
    completed: completed
  });
};

var _default = /*#__PURE__*/(0, _react.memo)(ProgressLoading);

exports.default = _default;
//# sourceMappingURL=ProgressLoading.js.map