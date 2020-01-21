"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from "prop-types";
var CL = {
  NUMBER_RANGE: 'input-minmax-number'
};
var S = {
  INPUT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 26,
    paddingLeft: 5,
    color: 'green',
    width: 40,
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e1e1cb',
    marginLeft: 5,
    marginRight: 5,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};
var C = {
  BLANK: '',
  TEXT: 'text',
  //NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _getInitStateFrom = function _getInitStateFrom(_ref) {
  var initValue = _ref.initValue;
  return {
    initValue: initValue,
    value: initValue != null ? initValue : C.BLANK
  };
};

var _isMinMaxNumber = function _isMinMaxNumber(_ref2) {
  var type = _ref2.type,
      min = _ref2.min,
      max = _ref2.max;
  return type === 'number' && _isNumber(min) && _isNumber(max);
};

var InputText =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(InputText, _Component);

  /*
  static propTypes = {
    style: PropTypes.object,
    initValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onEnter: PropTypes.func
  }
  */
  function InputText(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleInputChange = function (event) {
      var value = event.target.value,
          _this$props = _this.props,
          maxLength = _this$props.maxLength,
          onInputChange = _this$props.onInputChange;

      if (value.length <= maxLength) {
        _this.setState({
          value: value
        });

        if (_isFn(onInputChange)) {
          onInputChange(value);
        }
      }
    };

    _this._handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 27:
        case 46:
          event.preventDefault();

          _this.setState({
            value: C.BLANK
          });

          break;

        case 13:
          if (_this.isOnEnter) {
            _this.props.onEnter(event.target.value);
          }

          break;

        default:
          return;
      }
    };

    _this._refInput = _react["default"].createRef();
    _this.isOnEnter = _isFn(props.onEnter) ? true : false;
    _this.state = _getInitStateFrom(props);
    return _this;
  }

  var _proto = InputText.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (_isFn(onReg)) {
      onReg(this);
    }
  };

  InputText.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        style = _this$props2.style,
        type = _this$props2.type,
        spellCheck = _this$props2.spellCheck,
        placeholder = _this$props2.placeholder,
        maxLength = _this$props2.maxLength,
        min = _this$props2.min,
        max = _this$props2.max,
        step = _this$props2.step,
        value = this.state.value,
        _autoCorrect = spellCheck ? C.ON : C.OFF,
        _spellCheck = spellCheck ? "true" : "false",
        _className = _isMinMaxNumber(this.props) ? CL.NUMBER_RANGE : void 0;

    return _react["default"].createElement("input", {
      ref: this._refInput,
      className: _className,
      style: (0, _extends2["default"])({}, S.INPUT, {}, style),
      type: type || C.TEXT,
      name: C.TEXT,
      autoCapitalize: C.OFF,
      autoComplete: C.OFF,
      autoCorrect: _autoCorrect,
      spellCheck: _spellCheck,
      translate: "false",
      value: value,
      placeholder: placeholder,
      maxLength: maxLength,
      min: min,
      max: max,
      step: step,
      onChange: this._handleInputChange,
      onKeyDown: this._handleKeyDown
    });
  };

  _proto.getValue = function getValue() {
    return this.state.value;
  };

  _proto.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  _proto.focus = function focus() {
    var current = this._refInput.current;

    if (current) {
      current.focus();
    }
  };

  return InputText;
}(_react.Component);

InputText.defaultProps = {
  maxLength: 125
};
var _default = InputText;
exports["default"] = _default;
//# sourceMappingURL=InputText.js.map