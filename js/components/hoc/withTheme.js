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

var withTheme = function withTheme(Wrapper) {
  return function (props) {
    return _react2.default.createElement(
      _ThemeContext2.default.Consumer,
      null,
      function (theme) {
        return _react2.default.createElement(Wrapper, (0, _extends3.default)({}, props, { theme: theme }));
      }
    );
  };
};

exports.default = withTheme;
//# sourceMappingURL=withTheme.js.map