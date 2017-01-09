'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  INPUT: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  HR: {
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: 'red',
    borderImage: 'none',
    margin: 0,
    marginLeft: '10px',
    marginBottom: '5px',
    width: '230px'
  },
  HR_VALID: {
    borderColor: '#1B75BB'
  },
  HR_NOT_VALID: {
    borderColor: '#F44336'
  },
  ERR_MSG: {
    color: '#F44336',
    paddingLeft: '10px',
    paddingBottom: '5px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
};

var ZhDateField = _react2.default.createClass({
  displayName: 'ZhDateField',
  _createInitialState: function _createInitialState(props) {
    var _initValue = props.initValue ? props.initValue : '';
    return {
      value: _initValue,
      errorInput: undefined,
      isValid: true
    };
  },
  getInitialState: function getInitialState() {
    return this._createInitialState(this.props);
  },
  _handlerChangeValue: function _handlerChangeValue(event) {
    var _props = this.props,
        onTest = _props.onTest,
        nForecastDate = _props.nForecastDate,
        value = event.target.value;

    if (!onTest(value, nForecastDate)) {
      this.setState({
        value: value,
        isValid: false
      });
    } else {
      this.setState({
        value: value,
        isValid: true,
        errorInput: undefined
      });
    }
  },
  _handlerBlurValue: function _handlerBlurValue() {
    var _props2 = this.props,
        onTest = _props2.onTest,
        nForecastDate = _props2.nForecastDate,
        errorMsg = _props2.errorMsg,
        value = this.state.value;

    if (!onTest(value, nForecastDate)) {
      this.setState({
        errorInput: errorMsg,
        isValid: false
      });
    } else {
      this.setState({
        errorInput: undefined,
        isValid: true
      });
    }
  },
  render: function render() {
    var _this = this;

    var _state = this.state,
        value = _state.value,
        errorInput = _state.errorInput,
        _styleHr = this.state.isValid ? STYLE.HR_VALID : STYLE.HR_NOT_VALID;

    return _react2.default.createElement(
      'div',
      { style: STYLE.ROOT },
      _react2.default.createElement('input', {
        ref: function ref(input) {
          return _this.inputDate = input;
        },
        type: 'text',
        style: STYLE.INPUT,
        placeholder: 'YYYY-MM-DD',
        value: value,
        onChange: this._handlerChangeValue,
        onBlur: this._handlerBlurValue
      }),
      _react2.default.createElement('hr', { style: Object.assign({}, STYLE.HR, _styleHr) }),
      _react2.default.createElement(
        'div',
        { style: STYLE.ERR_MSG },
        errorInput
      )
    );
  },
  getValue: function getValue() {
    return this.state.value;
  },
  isValid: function isValid() {
    return this.state.isValid;
  },
  focusInput: function focusInput() {
    this.inputDate.focus();
  }
});

exports.default = ZhDateField;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhDateField.js.map