'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    marginLeft: '5px'
  },
  SVG: {
    paddingTop: '3px',
    paddingLeft: '2px',
    paddingRight: '2px'
  }
};

var SvgUp = function SvgUp() {
  return _react2.default.createElement(
    'span',
    { style: S.ROOT },
    _react2.default.createElement(
      'svg',
      { viewBox: '0 0 12 12', width: '100%', height: '100%',
        style: S.SVG, preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg'
      },
      _react2.default.createElement('path', { d: 'M 0,12 L 11,12 6,0 0,12',
        strokeWidth: '1',
        stroke: 'green',
        fill: 'green',
        strokeLinejoin: 'miter'
      })
    )
  );
};

exports.default = SvgUp;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\SvgUp.js.map