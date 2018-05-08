'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-up'
};

var SvgUp = function SvgUp() {
  return _react2.default.createElement(
    'span',
    { className: CL.ROOT },
    _react2.default.createElement(
      'svg',
      { viewBox: '0 0 12 12', width: '100%', height: '100%',
        className: CL.SVG,
        preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg'
      },
      _react2.default.createElement('path', { d: 'M 0,12 L 6,8 11,12 6,0 0,12' })
    )
  );
};

exports.default = SvgUp;
//# sourceMappingURL=SvgUp.js.map