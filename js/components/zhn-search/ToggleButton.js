"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SPINNER = 'zhn-search__spinner',
  CL_SPINNER_FAILED = 'zhn-select__spinner--failed',
  S_ARROW_SHOW = {
    borderColor: '#1b75bb transparent transparent'
  },
  _LOADING_ELEMENT = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_SPINNER,
    "data-loader": "circle"
  }),
  _LOADING_FAILED_ELEMENT = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_SPINNER_FAILED,
    "data-loader": "circle-failed"
  });
const ToggleButton = _ref => {
  let {
    isLoading,
    isLoadingFailed,
    options,
    isOptions,
    toggleOptions
  } = _ref;
  return isLoading ? _LOADING_ELEMENT : isLoadingFailed ? _LOADING_FAILED_ELEMENT : options && options.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {
    arrowStyle: isOptions ? S_ARROW_SHOW : null,
    onClick: toggleOptions
  }) : null;
};
var _default = exports.default = ToggleButton;
//# sourceMappingURL=ToggleButton.js.map