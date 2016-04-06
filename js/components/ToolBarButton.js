'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const styles = {
  button : {
    color: 'rgba(235,240,16,1)',
    background: 'linear-gradient(to top, #804000, gray)',
    border: '2px solid #696969',
    padding: '2px 3px',
    borderRadius: '4px',
  },
  buttonTypeA : {
    color: 'rgba(235,240,16,1)',
    background: 'linear-gradient(to top, #222222, gray)',
    border: '2px solid #696969',
    padding: '2px 3px',
    borderRadius: '4px',
  }
};
*/

var ToolBarButton = _react2.default.createClass({
  displayName: 'ToolBarButton',

  render: function render() {
    //let className = this.props.isTypeA ? 'button-type-a' : 'button-type-b';
    var className = void 0;

    switch (this.props.type) {
      case 'TypeA':
        className = 'button-type-a';break;
      case 'TypeC':
        className = 'button-type-c';break;
      default:
        className = 'button-type-b';
    }

    return _react2.default.createElement(
      'button',
      {
        className: className,
        title: this.props.title,
        onClick: this.props.onClick
      },
      this.props.caption
    );
  }
});

exports.default = ToolBarButton;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ToolBarButton.js.map