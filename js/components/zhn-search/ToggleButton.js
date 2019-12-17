"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var CL = {
  SPINNER: 'zhn-search__spinner',
  SPINNER_FAILED: 'zhn-select__spinner--failed'
};
var S = {
  ARROW_SHOW: {
    borderColor: '#1b75bb transparent transparent'
  }
};

var _loadingEl = _react["default"].createElement("span", {
  className: CL.SPINNER,
  "data-loader": "circle"
});

var _loadingFailedEl = _react["default"].createElement("span", {
  className: CL.SPINNER_FAILED,
  "data-loader": "circle-failed"
});

var ToggleButton = function ToggleButton(_ref) {
  var isLoading = _ref.isLoading,
      isLoadingFailed = _ref.isLoadingFailed,
      options = _ref.options,
      isOptions = _ref.isOptions,
      toggleOptions = _ref.toggleOptions;

  if (isLoading) {
    return _loadingEl;
  } else if (isLoadingFailed) {
    return _loadingFailedEl;
  } else if (options && options.length > 0) {
    return _react["default"].createElement(_ArrowCell["default"], {
      arrowStyle: isOptions ? S.ARROW_SHOW : null,
      onClick: toggleOptions
    });
  }

  return null;
};

var _default = ToggleButton;
exports["default"] = _default;
//# sourceMappingURL=ToggleButton.js.map