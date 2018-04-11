'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('./ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withThemeRef = function withThemeRef(Wrapper) {
  return _react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(
      _ThemeContext2.default.Consumer,
      null,
      function (theme) {
        return _react2.default.createElement(Wrapper, (0, _extends3.default)({}, props, { theme: theme, ref: ref }));
      }
    );
  });
};

exports.default = withThemeRef;
//# sourceMappingURL=withThemeRef.js.map