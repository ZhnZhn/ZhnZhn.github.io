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
  NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
};

var InputText = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(InputText, _Component);

  function InputText(props) {
    (0, _classCallCheck3.default)(this, InputText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this));

    _this._handleInputChange = function (event) {
      _this.setState({ value: event.target.value });
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

    _this.isOnEnter = typeof props.onEnter === "function" ? true : false;
    _this.state = {
      value: props.initValue
    };
    return _this;
  }

  (0, _createClass3.default)(InputText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props) {
        this.setState({
          value: nextProps.initValue != null ? nextProps.initValue : C.BLANK
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          spellCheck = _props.spellCheck,
          value = this.state.value,
          _autoCorrect = spellCheck ? C.ON : C.OFF,
          _spellCheck = spellCheck ? true : false;

      return _react2.default.createElement('input', {
        style: (0, _extends3.default)({}, S.INPUT_TEXT, style),
        type: C.TEXT,
        name: C.TEXT,
        autoCapitalize: C.OFF,
        autoComplete: C.NEW_TEXT,
        autoCorrect: _autoCorrect,
        spellCheck: _spellCheck,
        translate: false,
        value: value,
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
  }]);
  return InputText;
}(_react.Component), _class.defaultProps = {
  initValue: C.BLANK
}, _temp);
process.env.NODE_ENV !== "production" ? InputText.propTypes = {
  initValue: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onEnter: _propTypes2.default.func
} : void 0;
exports.default = InputText;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputText.js.map