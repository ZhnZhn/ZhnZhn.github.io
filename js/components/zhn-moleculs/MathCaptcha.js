"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputSlider = _interopRequireDefault(require("../zhn/InputSlider"));

//import PropTypes from "prop-types";
var MSG = 'Before loading, please, enter sum using slider';
var S = {
  MSG: {
    color: 'grey',
    fontWeight: 'bold'
  },
  P_SUM: {
    textAlign: 'center',
    fontSize: '22px',
    paddingTop: 4
  },
  SUM_OK: {
    color: '#4caf50'
  },
  SUM_NOT_OK: {
    color: '#f44336'
  }
};

var _crRandomNumber = function _crRandomNumber(m, n) {
  if (m === void 0) {
    m = 0;
  }

  if (n === void 0) {
    n = 10;
  }

  return m + Math.floor((n - m + 1) * Math.random());
};

var MatchCaptcha = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MatchCaptcha, _Component);

  /*
  static propTypes = {
    rootStyle: PropTypes.object
  }
  */
  function MatchCaptcha(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hChangeSlider = function (event, value) {
      var _isOk = _this.firstNumber + _this.secondNumber === value ? true : false;

      _this.setState({
        isOk: _isOk,
        resultSum: value
      });
    };

    _this.firstNumber = _crRandomNumber(0, 10);
    _this.secondNumber = _crRandomNumber(0, 10);
    _this.state = {
      isOk: false,
      resultSum: ''
    };
    return _this;
  }

  var _proto = MatchCaptcha.prototype;

  _proto.render = function render() {
    var rootStyle = this.props.rootStyle,
        _this$state = this.state,
        isOk = _this$state.isOk,
        resultSum = _this$state.resultSum,
        _sumStyle = isOk ? S.SUM_OK : S.SUM_NOT_OK;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: rootStyle
    }, /*#__PURE__*/_react["default"].createElement("p", {
      style: S.MSG
    }, MSG), /*#__PURE__*/_react["default"].createElement("p", {
      style: S.P_SUM
    }, /*#__PURE__*/_react["default"].createElement("span", null, this.firstNumber + " + " + this.secondNumber + " = "), /*#__PURE__*/_react["default"].createElement("span", {
      style: _sumStyle
    }, resultSum)), /*#__PURE__*/_react["default"].createElement(_InputSlider["default"], {
      onChange: this._hChangeSlider
    }));
  };

  _proto.isOk = function isOk() {
    return this.state.isOk;
  };

  return MatchCaptcha;
}(_react.Component);

var _default = MatchCaptcha;
exports["default"] = _default;
//# sourceMappingURL=MathCaptcha.js.map