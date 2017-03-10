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

var _InputSlider = require('../zhn/InputSlider');

var _InputSlider2 = _interopRequireDefault(_InputSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG = 'Before loading, please, enter sum using slider';

var S = {
  MSG: {
    color: 'grey',
    fontWeight: 'bold'
  },
  P_SUM: {
    textAlign: 'center',
    fontSize: '22px',
    paddingTop: '4px'
  },
  SUM_OK: {
    color: '#4caf50'
  },
  SUM_NOT_OK: {
    color: '#f44336'
  }
};

var _fnRandomNumber = function _fnRandomNumber() {
  var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  return m + Math.floor((n - m + 1) * Math.random());
};

var MatchCaptcha = function (_Component) {
  (0, _inherits3.default)(MatchCaptcha, _Component);

  function MatchCaptcha(props) {
    (0, _classCallCheck3.default)(this, MatchCaptcha);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MatchCaptcha.__proto__ || Object.getPrototypeOf(MatchCaptcha)).call(this));

    _this._handleChangeSlider = function (event, value) {
      var _isOk = _this.firstNumber + _this.secondNumber === value ? true : false;
      _this.setState({
        isOk: _isOk,
        resultSum: value
      });
    };

    _this.isOk = function () {
      return _this.state.isOk;
    };

    _this.firstNumber = _fnRandomNumber(0, 10);
    _this.secondNumber = _fnRandomNumber(0, 10);
    _this.state = {
      isOk: false,
      resultSum: ''
    };
    return _this;
  }

  (0, _createClass3.default)(MatchCaptcha, [{
    key: 'render',
    value: function render() {
      var rootStyle = this.props.rootStyle,
          _state = this.state,
          isOk = _state.isOk,
          resultSum = _state.resultSum,
          _sumStyle = isOk ? S.SUM_OK : S.SUM_NOT_OK;

      return _react2.default.createElement(
        'div',
        { style: rootStyle },
        _react2.default.createElement(
          'p',
          { style: S.MSG },
          MSG
        ),
        _react2.default.createElement(
          'p',
          { style: S.P_SUM },
          _react2.default.createElement(
            'span',
            null,
            this.firstNumber + ' + ' + this.secondNumber + ' = '
          ),
          _react2.default.createElement(
            'span',
            { style: _sumStyle },
            resultSum
          )
        ),
        _react2.default.createElement(_InputSlider2.default, {
          onChange: this._handleChangeSlider
        })
      );
    }
  }]);
  return MatchCaptcha;
}(_react.Component);

exports.default = MatchCaptcha;
//# sourceMappingURL=MathCaptcha.js.map