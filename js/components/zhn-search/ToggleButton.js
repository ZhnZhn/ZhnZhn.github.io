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
};

const _loadingEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: CL_SPINNER,
  "data-loader": "circle"
});

const _loadingFailedEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: CL_SPINNER_FAILED,
  "data-loader": "circle-failed"
});

const ToggleButton = ({
  isLoading,
  isLoadingFailed,
  options,
  isOptions,
  toggleOptions
}) => {
  if (isLoading) {
    return _loadingEl;
  } else if (isLoadingFailed) {
    return _loadingFailedEl;
  } else if (options && options.length > 0) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {
      arrowStyle: isOptions ? S_ARROW_SHOW : null,
      onClick: toggleOptions
    });
  }

  return null;
};

var _default = ToggleButton;
exports.default = _default;
//# sourceMappingURL=ToggleButton.js.map