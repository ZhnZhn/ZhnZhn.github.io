'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var InputSecret = _react2.default.createClass({
  displayName: 'InputSecret',
  getInitialState: function getInitialState() {
    return {
      value: ''
    };
  },
  _handlerChangeValue: function _handlerChangeValue(event) {

    /*
    if (!this.props.onTest(this.state.value)) {
      this.state.isValid = false;
    } else {
      this.state.isValid = true;
      this.state.errorInput = null;
    }
    */
    this.setState({ value: event.target.value });
  },
  _handlerBlurValue: function _handlerBlurValue() {},
  render: function render() {
    var placeholder = this.props.placeholder;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement('input', {
        ref: 'input',
        autocomplete: 'off',
        type: 'password',
        style: styles.inputText,
        translate: false,
        placeholder: placeholder,
        value: this.state.value,
        onChange: this._handlerChangeValue,
        onBlur: this._handlerBlurValue
      })
    );
  },
  getValue: function getValue() {
    return this.state.value;
  }
});

exports.default = InputSecret;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputSecret.js.map