'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputStyle = require('./InputStyle');

var _InputStyle2 = _interopRequireDefault(_InputStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const STYLE = {
  ROOT : {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  INPUT : {
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
  HR : {
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: 'red',
    borderImage: 'none',
    margin: 0,
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    width: 'auto'
    //width: '90%'
    //width: '230px'
  },
  HR_VALID : {
     borderColor: '#1B75BB'
  },
  HR_NOT_VALID : {
     borderColor: '#F44336'
  },
  ERR_MSG : {
    color: '#F44336',
    paddingLeft: '10px',
    paddingBottom: '5px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
};
*/

var DateField = (_temp = _class = function (_Component) {
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

    _this._handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 13:
          if (_this.isOnEnter) {
            _this.props.onEnter(event.target.value);
          }
          break;
        case 27:case 46:
          event.preventDefault();
          _this.setState({
            value: _this.props.initValue || '',
            errorInput: undefined,
            isValid: true
          });
          break;
        default:
          return;
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

    _this.isOnEnter = typeof props.onEnter == 'function' ? true : false;
    _this.state = {
      value: props.initValue || '',
      errorInput: undefined,
      isValid: true
    };
    return _this;
  }
  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     errorMsg: PropTypes.string,
     nForecastDate: PropTypes.number,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
   */


  (0, _createClass3.default)(DateField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootStyle = _props.rootStyle,
          inputStyle = _props.inputStyle,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? 'YYYY-MM-DD' : _props$placeholder,
          _state = this.state,
          value = _state.value,
          errorInput = _state.errorInput,
          isValid = _state.isValid,
          _styleHr = isValid ? _InputStyle2.default.HR_VALID : _InputStyle2.default.HR_NOT_VALID;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, _InputStyle2.default.ROOT, rootStyle) },
        _react2.default.createElement('input', {
          style: (0, _extends3.default)({}, _InputStyle2.default.INPUT, inputStyle),
          name: 'text-date'
          //autoComplete="new-text-date"
          , autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          ref: function ref(input) {
            return _this2.inputDate = input;
          },
          type: 'text',
          placeholder: placeholder,
          value: value,
          onChange: this._handleChangeValue,
          onBlur: this._handleBlurValue,
          onKeyDown: this._handleKeyDown
        }),
        _react2.default.createElement('hr', { style: Object.assign({}, _InputStyle2.default.HR, _styleHr) }),
        _react2.default.createElement(
          'div',
          { style: _InputStyle2.default.ERR_MSG },
          errorInput
        )
      );
    }
  }]);
  return DateField;
}(_react.Component), _class.defaultProps = {
  onTest: function onTest() {
    return true;
  }
}, _temp);
exports.default = DateField;
//# sourceMappingURL=DateField.js.map