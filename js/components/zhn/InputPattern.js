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

var _class, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputStyle = require('./InputStyle');

var _InputStyle2 = _interopRequireDefault(_InputStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPattern = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(InputPattern, _Component);

  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     isUpdateInit: PropTypes.bool,
     placeholder: PropTypes.string,
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
  */
  function InputPattern(props) {
    (0, _classCallCheck3.default)(this, InputPattern);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputPattern.__proto__ || Object.getPrototypeOf(InputPattern)).call(this));

    _initialiseProps.call(_this);

    _this.state = _this._crInitState(props);
    return _this;
  }

  (0, _createClass3.default)(InputPattern, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && nextProps.isUpdateInit) {
        this.setState(this._crInitState(nextProps));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          inputStyle = _props.inputStyle,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? 'Input Pattern' : _props$placeholder,
          _state = this.state,
          value = _state.value,
          errorInput = _state.errorInput,
          isValid = _state.isValid,
          _styleHr = isValid ? _InputStyle2.default.HR_VALID : _InputStyle2.default.HR_NOT_VALID;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, _InputStyle2.default.ROOT, rootStyle) },
        _react2.default.createElement('input', {
          type: 'text',
          style: (0, _extends3.default)({}, _InputStyle2.default.INPUT, inputStyle),
          ref: this._refInput,
          name: 'text-date'
          //autoComplete="new-text-date"
          , autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          placeholder: placeholder,
          value: value,
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
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._crInitState = function (props) {
    return {
      value: props.initValue || '',
      errorInput: undefined,
      isValid: true
    };
  };

  this._handleChangeValue = function (event) {
    var onTest = _this2.props.onTest,
        value = event.target.value;

    if (!onTest(value)) {
      _this2.setState({
        value: value,
        isValid: false
      });
    } else {
      _this2.setState({
        value: value,
        isValid: true,
        errorInput: undefined
      });
    }
  };

  this._handleBlurValue = function () {
    var _props2 = _this2.props,
        onTest = _props2.onTest,
        errorMsg = _props2.errorMsg,
        value = _this2.state.value;

    if (!onTest(value)) {
      _this2.setState({
        errorInput: errorMsg,
        isValid: false
      });
    } else {
      _this2.setState({
        errorInput: undefined,
        isValid: true
      });
    }
  };

  this._handleKeyDown = function (event) {
    switch (event.keyCode) {
      case 13:
        if (typeof _this2.props.onEnter === 'function') {
          _this2.props.onEnter(event.target.value);
        }
        break;
      case 27:case 46:
        event.preventDefault();
        _this2.setState({
          value: _this2.props.initValue || '',
          errorInput: undefined,
          isValid: true
        });
        break;
      default:
        return;
    }
  };

  this._refInput = function (input) {
    return _this2.inputPattern = input;
  };
}, _temp);
exports.default = InputPattern;
//# sourceMappingURL=InputPattern.js.map