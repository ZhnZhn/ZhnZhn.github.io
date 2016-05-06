'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#E1E1CB',
    marginLeft: '5px',
    marginRight: '5px',
    display: 'inline'
  }
};

var InputText = _react2.default.createClass({
  displayName: 'InputText',
  getDefaultProps: function getDefaultProps() {
    return {
      initValue: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.initValue
    };
  },
  _handlerInputChange: function _handlerInputChange(event) {
    this.setState({ value: event.target.value });
  },
  render: function render() {
    var value = this.state.value;

    return _react2.default.createElement('input', {
      type: 'text',
      style: styles.inputText,
      value: value,
      translate: false,
      onChange: this._handlerInputChange
    });
  },
  getValue: function getValue() {
    return this.state.value;
  }
});

exports.default = InputText;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputText.js.map