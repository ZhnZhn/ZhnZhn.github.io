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
    //color: '#80c040',
    //color : '#2F7ED8',
    //border : '2px solid #2F7ED8',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

var ButtonCircle = _react2.default.createClass({
  displayName: 'ButtonCircle',
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var onClick = _props.onClick;

    return _react2.default.createElement(
      'span',
      { className: 'button-circle', style: styles.rootSpan, onClick: onClick },
      caption
    );
  }
});

exports.default = ButtonCircle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ButtonCircle.js.map