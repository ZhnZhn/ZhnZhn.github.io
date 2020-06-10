"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _InputStyle = _interopRequireDefault(require("./InputStyle"));

//import PropTypes from "prop-types";
var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crInitialState = function _crInitialState(_ref) {
  var initialValue = _ref.initialValue;
  return (0, _extends2["default"])({
    initialValue: initialValue
  }, _crValueState(initialValue));
};

var _crValueState = function _crValueState(value) {
  if (value === void 0) {
    value = '';
  }

  return {
    value: value,
    errorInput: null,
    isValid: true
  };
};

var DateField = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DateField, _Component);

  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initialValue: PropTypes.string,
     placeholder: PropTypes.string,
     inpumode: PropTypes.string,
     maxLength: PropTypes.number,
     errorMsg: PropTypes.string,
     nForecastDate: PropTypes.number,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
   */
  function DateField(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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
          initialValue = _this$props2.initialValue,
          onTest = _this$props2.onTest,
          nForecastDate = _this$props2.nForecastDate,
          errorMsg = _this$props2.errorMsg,
          value = _this.state.value;

      if (value !== initialValue && !onTest(value, nForecastDate)) {
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

        case 27:
        case 46:
          event.preventDefault();

          _this.setState(_crValueState(_this.props.initialValue));

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
    _this.state = _crInitialState(props);
    return _this;
  }

  DateField.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.initialValue !== prevState.initialValue ? _crInitialState(nextProps) : null;
  };

  var _proto = DateField.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        rootStyle = _this$props3.rootStyle,
        inputStyle = _this$props3.inputStyle,
        placeholder = _this$props3.placeholder,
        inputmode = _this$props3.inputmode,
        name = _this$props3.name,
        maxLength = _this$props3.maxLength,
        _this$state = this.state,
        value = _this$state.value,
        errorInput = _this$state.errorInput,
        isValid = _this$state.isValid,
        _styleHr = isValid ? _InputStyle["default"].HR_VALID : _InputStyle["default"].HR_NOT_VALID;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _InputStyle["default"].ROOT, rootStyle)
    }, /*#__PURE__*/_react["default"].createElement("input", {
      ref: this._refDate,
      style: (0, _extends2["default"])({}, _InputStyle["default"].INPUT, inputStyle),
      name: name //autoComplete="new-text-date"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      type: "text",
      placeholder: placeholder,
      inputMode: inputmode,
      value: value,
      maxLength: maxLength,
      onChange: this._handleChangeValue,
      onBlur: this._handleBlurValue,
      onKeyDown: this._handleKeyDown
    }), /*#__PURE__*/_react["default"].createElement("hr", {
      style: (0, _extends2["default"])({}, _InputStyle["default"].HR, _styleHr)
    }), /*#__PURE__*/_react["default"].createElement("div", {
      style: _InputStyle["default"].ERR_MSG
    }, errorInput));
  };

  _proto.setValue = function setValue(value) {
    if (this.props.onTest(value)) {
      this.setState(_crValueState(value));
    }
  };

  return DateField;
}(_react.Component);

DateField.defaultProps = {
  initialValue: '',
  placeholder: 'YYYY-MM-DD',
  inputmode: 'numeric',
  name: 'text-date',
  maxLength: 10,
  onTest: function onTest() {
    return true;
  }
};
var _default = DateField;
exports["default"] = _default;
//# sourceMappingURL=DateField.js.map