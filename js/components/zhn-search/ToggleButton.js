'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArrowCell = require('./ArrowCell');

var _ArrowCell2 = _interopRequireDefault(_ArrowCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  SPINNER: 'zhn-search__spinner',
  SPINNER_FAILED: 'zhn-select__spinner--failed'
};
var S = {
  ARROW_SHOW: {
    borderColor: '#1b75bb transparent transparent'
  }
};

var _loadingEl = _react2.default.createElement('span', {
  className: CL.SPINNER,
  'data-loader': 'circle'
});
var _loadingFailedEl = _react2.default.createElement('span', {
  className: CL.SPINNER_FAILED,
  'data-loader': 'circle-failed'
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
    return _react2.default.createElement(_ArrowCell2.default, {
      arrowStyle: isOptions ? S.ARROW_SHOW : null,
      onClick: toggleOptions
    });
  }
  return null;
};

exports.default = ToggleButton;
//# sourceMappingURL=ToggleButton.js.map