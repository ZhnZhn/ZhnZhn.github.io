'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withProps = function withProps(overrideProps) {
  return function (BaseComponent) {
    return function (props) {
      return _react2.default.createElement(BaseComponent, (0, _extends3.default)({}, props, overrideProps));
    };
  };
};

exports.default = withProps;
//# sourceMappingURL=withProps.js.map