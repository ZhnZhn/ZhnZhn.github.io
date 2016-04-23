'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootSpan: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    marginLeft: '5px'
  },
  svg: {
    paddingTop: '3px',
    paddingLeft: '2px',
    paddingRight: '2px'
  }
};

var SvgDown = _react2.default.createClass({
  displayName: 'SvgDown',
  render: function render() {
    return _react2.default.createElement(
      'span',
      { style: styles.rootSpan },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 12 12', width: '100%', height: '100%',
          style: styles.svg,
          preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement('path', {
          d: 'M 0,0 L 11,0 6,12, 0,0',
          strokeWidth: '1',
          stroke: '#ED5813',
          fill: '#ED5813' })
      )
    );
  }
});

exports.default = SvgDown;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\SvgDown.js.map