'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgInfo = function SvgInfo(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '8' })
  );
};

exports.default = SvgInfo;
//# sourceMappingURL=SvgInfo.js.map