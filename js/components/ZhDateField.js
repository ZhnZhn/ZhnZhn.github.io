'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ZhDateField = function (_Component) {
  _inherits(ZhDateField, _Component);

  function ZhDateField(props) {
    _classCallCheck(this, ZhDateField);

    var _this = _possibleConstructorReturn(this, (ZhDateField.__proto__ || Object.getPrototypeOf(ZhDateField)).call(this));

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

  _createClass(ZhDateField, [{
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

  return ZhDateField;
}(_react.Component);

exports.default = ZhDateField;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhDateField.js.map