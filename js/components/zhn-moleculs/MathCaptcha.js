'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSlider = require('../zhn/InputSlider');

var _InputSlider2 = _interopRequireDefault(_InputSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(MatchCaptcha, _Component);

  function MatchCaptcha(props) {
    _classCallCheck(this, MatchCaptcha);

    var _this = _possibleConstructorReturn(this, (MatchCaptcha.__proto__ || Object.getPrototypeOf(MatchCaptcha)).call(this));

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

  _createClass(MatchCaptcha, [{
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\MathCaptcha.js.map