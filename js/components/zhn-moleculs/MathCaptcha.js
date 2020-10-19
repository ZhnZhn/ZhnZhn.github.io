"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _InputSlider = _interopRequireDefault(require("../zhn/InputSlider"));

//import PropTypes from "prop-types";
var MSG = 'Before loading, please, enter sum using slider';
var S = {
  MSG: {
    color: 'grey',
    fontWeight: 'bold'
  },
  P_SUM: {
    paddingTop: 4,
    textAlign: 'center',
    fontSize: '22px'
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

var _useRandomNumber = function _useRandomNumber() {
  return (0, _react.useState)(function () {
    return _crRandomNumber(0, 10);
  })[0];
};

var MathCaptcha = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var style = _ref.style;

  var n1 = _useRandomNumber(),
      n2 = _useRandomNumber(),
      _useState = (0, _react.useState)({
    isOk: false,
    resultSum: ''
  }),
      _useState$ = _useState[0],
      _isOk = _useState$.isOk,
      resultSum = _useState$.resultSum,
      setState = _useState[1],
      _hChangeSlider = (0, _react.useCallback)(function (evt, value) {
    return setState({
      isOk: n1 + n2 === value,
      resultSum: value
    });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */


  (0, _react.useImperativeHandle)(ref, function () {
    return {
      isOk: function isOk() {
        return _isOk;
      }
    };
  }, [_isOk]);

  var _sumStyle = _isOk ? S.SUM_OK : S.SUM_NOT_OK;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S.MSG,
      children: MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      style: S.P_SUM,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: n1 + " + " + n2 + " = "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _sumStyle,
        children: resultSum
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSlider["default"], {
      onChange: _hChangeSlider
    })]
  });
});
/*
MatchCaptcha.propTypes = {
  style: PropTypes.object
}
*/

var _default = MathCaptcha;
exports["default"] = _default;
//# sourceMappingURL=MathCaptcha.js.map