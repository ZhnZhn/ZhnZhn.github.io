'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-down'
};

var SvgDown = function SvgDown() {
  return _react2.default.createElement(
    'span',
    { className: CL.ROOT },
    _react2.default.createElement(
      'svg',
      { viewBox: '0 0 12 12', width: '100%', height: '100%',
        className: CL.SVG,
        preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg'
      },
      _react2.default.createElement('path', { d: 'M 0,0 L 6,4 11,0 6,12, 0,0' })
    )
  );
};

exports.default = SvgDown;
//# sourceMappingURL=SvgDown.js.map