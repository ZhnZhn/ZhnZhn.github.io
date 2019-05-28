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

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crValueState = function _crValueState() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    value: value,
    errorInput: null,
    isValid: true
  };
};

var DateField = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(DateField, _Component);

  function DateField(props) {
    (0, _classCallCheck3.default)(this, DateField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props));

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
        _this.setState(_crValueState(value));
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
          errorInput: null,
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
          _this.setState(_crValueState(_this.props.initValue));
          break;
        default:
          return;
      }
    };

    _this._refDate = function (node) {
      return _this.inputDate = node;
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

    _this.isOnEnter = _isFn(props.onEnter);
    _this.state = _crValueState(props.initValue);
    return _this;
  }
  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     inpumode: PropTypes.string,
     maxLength: PropTypes.number,
     errorMsg: PropTypes.string,
     nForecastDate: PropTypes.number,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
   */

  (0, _createClass3.default)(DateField, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          inputStyle = _props.inputStyle,
          placeholder = _props.placeholder,
          inputmode = _props.inputmode,
          name = _props.name,
          maxLength = _props.maxLength,
          _state = this.state,
          value = _state.value,
          errorInput = _state.errorInput,
          isValid = _state.isValid,
          _styleHr = isValid ? _InputStyle2.default.HR_VALID : _InputStyle2.default.HR_NOT_VALID;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, _InputStyle2.default.ROOT, rootStyle) },
        _react2.default.createElement('input', {
          ref: this._refDate,
          style: (0, _extends3.default)({}, _InputStyle2.default.INPUT, inputStyle),
          name: name
          //autoComplete="new-text-date"
          , autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          type: 'text',
          placeholder: placeholder,
          inputmode: inputmode,
          value: value,
          maxLength: maxLength,
          onChange: this._handleChangeValue,
          onBlur: this._handleBlurValue,
          onKeyDown: this._handleKeyDown
        }),
        _react2.default.createElement('hr', { style: (0, _extends3.default)({}, _InputStyle2.default.HR, _styleHr) }),
        _react2.default.createElement(
          'div',
          { style: _InputStyle2.default.ERR_MSG },
          errorInput
        )
      );
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this.props.onTest(value)) {
        this.setState(_crValueState(value));
      }
    }
  }]);
  return DateField;
}(_react.Component), _class.defaultProps = {
  placeholder: 'YYYY-MM-DD',
  inputmode: 'numeric',
  name: 'text-date',
  maxLength: 10,
  onTest: function onTest() {
    return true;
  }
}, _temp);
exports.default = DateField;
//# sourceMappingURL=DateField.js.map