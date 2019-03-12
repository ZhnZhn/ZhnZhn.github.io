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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var S = {
  INPUT_TEXT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#E1E1CB',
    marginLeft: '5px',
    marginRight: '5px'
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

var _getInitStateFrom = function _getInitStateFrom(_ref) {
  var initValue = _ref.initValue;
  return {
    initValue: initValue,
    value: initValue != null ? initValue : C.BLANK
  };
};

var InputText = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(InputText, _Component);

  function InputText(props) {
    (0, _classCallCheck3.default)(this, InputText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this, props));

    _this._handleInputChange = function (event) {
      var value = event.target.value,
          maxLenght = _this.props.maxLenght;

      if (value.length <= maxLenght) {
        _this.setState({ value: value });
      }
    };

    _this._handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 27:case 46:
          event.preventDefault();
          _this.setState({ value: C.BLANK });
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

    _this.isOnEnter = _isFn(props.onEnter) ? true : false;

    _this.state = _getInitStateFrom(props);
    return _this;
  }
  /*
  static propTypes = {
    style: PropTypes.object,
    initValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onEnter: PropTypes.func
  }
  */


  (0, _createClass3.default)(InputText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (_isFn(onReg)) {
        onReg(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          type = _props.type,
          spellCheck = _props.spellCheck,
          placeholder = _props.placeholder,
          maxLenght = _props.maxLenght,
          value = this.state.value,
          _autoCorrect = spellCheck ? C.ON : C.OFF,
          _spellCheck = spellCheck ? true : false;

      return _react2.default.createElement('input', {
        style: (0, _extends3.default)({}, S.INPUT_TEXT, style),
        type: type || C.TEXT,
        name: C.TEXT,
        autoCapitalize: C.OFF,
        autoComplete: C.OFF,
        autoCorrect: _autoCorrect,
        spellCheck: _spellCheck,
        translate: false,
        value: value,
        placeholder: placeholder,
        maxLength: maxLenght,
        onChange: this._handleInputChange,
        onKeyDown: this._handleKeyDown
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.setState({ value: value });
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
    }
  }]);
  return InputText;
}(_react.Component), _class.defaultProps = {
  maxLenght: 125
}, _temp);
exports.default = InputText;
//# sourceMappingURL=InputText.js.map