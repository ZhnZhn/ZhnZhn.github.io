'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var DateField = function (_Component) {
  (0, _inherits3.default)(DateField, _Component);

  function DateField(props) {
    (0, _classCallCheck3.default)(this, DateField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this));

    _this._handleChangeValue = function (event) {
      var _this$props = _this.props,
          onTest = _this$props.onTest,
          nForecastDate = _this$props.nForecastDate,
          value = event.target.value;

      if (!onTest(value, nForecastDate)) {
        _this.setState({
          value: value,
          isValid: false
        });
      } else {
        _this.setState({
          value: value,
          isValid: true,
          errorInput: undefined
        });
      }
    };

    _this._handleBlurValue = function () {
      var _this$props2 = _this.props,
          onTest = _this$props2.onTest,
          nForecastDate = _this$props2.nForecastDate,
          errorMsg = _this$props2.errorMsg,
          value = _this.state.value;

      if (!onTest(value, nForecastDate)) {
        _this.setState({
          errorInput: errorMsg,
          isValid: false
        });
      } else {
        _this.setState({
          errorInput: undefined,
          isValid: true
        });
      }
    };

    _this.getValue = function () {
      return _this.state.value;
    };

    _this.isValid = function () {
      return _this.state.isValid;
    };

    _this.focusInput = function () {
      _this.inputDate.focus();
    };

    _this.state = {
      value: props.initValue ? props.initValue : '',
      errorInput: undefined,
      isValid: true
    };
    return _this;
  }

  (0, _createClass3.default)(DateField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          value = _state.value,
          errorInput = _state.errorInput,
          isValid = _state.isValid,
          _styleHr = isValid ? STYLE.HR_VALID : STYLE.HR_NOT_VALID;

      return _react2.default.createElement(
        'div',
        { style: STYLE.ROOT },
        _react2.default.createElement('input', {
          name: 'text-date',
          autoComplete: 'new-text-date',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          ref: function ref(input) {
            return _this2.inputDate = input;
          },
          type: 'text',
          style: STYLE.INPUT,
          placeholder: 'YYYY-MM-DD',
          value: value,
          onChange: this._handleChangeValue,
          onBlur: this._handleBlurValue
        }),
        _react2.default.createElement('hr', { style: Object.assign({}, STYLE.HR, _styleHr) }),
        _react2.default.createElement(
          'div',
          { style: STYLE.ERR_MSG },
          errorInput
        )
      );
    }
  }]);
  return DateField;
}(_react.Component);

exports.default = DateField;
//# sourceMappingURL=DateField.js.map