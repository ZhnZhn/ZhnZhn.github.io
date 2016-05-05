'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  svg: {
    padding: '3px'
  }
};

var SvgClose = _react2.default.createClass({
  displayName: 'SvgClose',

  render: function render() {
    return _react2.default.createElement(
      'div',
      {
        className: 'svg-close',
        onClick: this.props.onClose
      },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 12 12', width: '100%', height: '100%',
          style: styles.svg,
          preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement('path', { d: 'M 0,0 L 12,12', strokeWidth: '2', stroke: '#ED5813',
          strokeLinecap: 'round'
        }),
        _react2.default.createElement('path', { d: 'M 12,0 L 0,12', strokeWidth: '2', stroke: '#ED5813',
          strokeLinecap: 'round'
        })
      )
    );
  }
});

exports.default = SvgClose;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\SvgClose.js.map