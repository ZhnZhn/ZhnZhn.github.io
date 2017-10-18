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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
    marginRight: '10px',
    marginBottom: '5px',
    width: 'auto'
    //width: '90%'
    //width: '230px'
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

var InputPattern = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(InputPattern, _Component);

  function InputPattern(props) {
    (0, _classCallCheck3.default)(this, InputPattern);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputPattern.__proto__ || Object.getPrototypeOf(InputPattern)).call(this));

    _this._handleChangeValue = function (event) {
      var onTest = _this.props.onTest,
          value = event.target.value;

      if (!onTest(value)) {
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
      var _this$props = _this.props,
          onTest = _this$props.onTest,
          errorMsg = _this$props.errorMsg,
          value = _this.state.value;

      if (!onTest(value)) {
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
          if (typeof _this.props.onEnter === 'function') {
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

    _this.state = {
      value: props.initValue ? props.initValue : '',
      errorInput: undefined,
      isValid: true
    };
    return _this;
  }

  (0, _createClass3.default)(InputPattern, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootStyle = _props.rootStyle,
          inputStyle = _props.inputStyle,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? 'Input Pattern' : _props$placeholder,
          _state = this.state,
          value = _state.value,
          errorInput = _state.errorInput,
          isValid = _state.isValid,
          _styleHr = isValid ? STYLE.HR_VALID : STYLE.HR_NOT_VALID;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, STYLE.ROOT, rootStyle) },
        _react2.default.createElement('input', {
          style: (0, _extends3.default)({}, STYLE.INPUT, inputStyle),
          name: 'text-date',
          autoComplete: 'new-text-date',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          ref: function ref(input) {
            return _this2.inputPattern = input;
          },
          type: 'text',
          placeholder: placeholder,
          value: value,
          onChange: this._handleChangeValue,
          onBlur: this._handleBlurValue,
          onKeyDown: this._handleKeyDown
        }),
        _react2.default.createElement('hr', { style: (0, _extends3.default)({}, STYLE.HR, _styleHr) }),
        _react2.default.createElement(
          'div',
          { style: STYLE.ERR_MSG },
          errorInput
        )
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return String(this.state.value).trim();
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.props.onTest(this.state.value);
    }
  }, {
    key: 'focusInput',
    value: function focusInput() {
      this.inputPattern.focus();
    }
  }]);
  return InputPattern;
}(_react.Component), _class.defaultProps = {
  onTest: function onTest() {
    return true;
  }
}, _temp);
process.env.NODE_ENV !== "production" ? InputPattern.propTypes = {
  rootStyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  initValue: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  errorMsg: _propTypes2.default.string,
  onTest: _propTypes2.default.func,
  onEnter: _propTypes2.default.func
} : void 0;
exports.default = InputPattern;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputPattern.js.map