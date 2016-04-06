'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  svgDiv: {
    width: '12px',
    height: '12px',
    display: 'inline-block',
    float: 'right',
    marginRight: '10px'
  }
};

var SvgClose = _react2.default.createClass({
  displayName: 'SvgClose',

  render: function render() {
    return _react2.default.createElement(
      'div',
      {
        style: styles.svgDiv,
        onClick: this.props.onClose
      },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 12 12', width: '100%', height: '100%',
          preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement('path', { d: 'M 0,0 L 12,12', strokeWidth: '2', stroke: '#ED5813' }),
        _react2.default.createElement('path', { d: 'M 12,0 L 0,12', strokeWidth: '2', stroke: '#ED5813' })
      )
    );
  }
});

exports.default = SvgClose;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\SvgClose.js.map