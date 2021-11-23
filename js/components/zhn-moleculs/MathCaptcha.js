"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _InputSlider = _interopRequireDefault(require("../zhn/InputSlider"));

var _jsxRuntime = require("react/jsx-runtime");

const MSG = 'Before loading, please, enter sum using slider',
      S_MSG = {
  color: 'grey',
  fontWeight: 'bold'
},
      S_P_SUM = {
  paddingTop: 4,
  textAlign: 'center',
  fontSize: '22px'
},
      S_SUM_OK = {
  color: '#4caf50'
},
      S_SUM_NOT_OK = {
  color: '#f44336'
};

const _crRandomNumber = (m = 0, n = 10) => m + Math.floor((n - m + 1) * Math.random());

const _useRandomNumber = () => (0, _react.useState)(() => _crRandomNumber(0, 10))[0];

const MathCaptcha = /*#__PURE__*/(0, _react.forwardRef)(({
  style
}, ref) => {
  const n1 = _useRandomNumber(),
        n2 = _useRandomNumber(),
        [{
    isOk,
    resultSum
  }, setState] = (0, _react.useState)({
    isOk: false,
    resultSum: ''
  })
  /* eslint-disable react-hooks/exhaustive-deps */
  ,
        _hChangeSlider = (0, _react.useCallback)((evt, value) => setState({
    isOk: n1 + n2 === value,
    resultSum: value
  }), []);
  /* eslint-enable react-hooks/exhaustive-deps */


  (0, _react.useImperativeHandle)(ref, () => ({
    isOk: () => isOk
  }), [isOk]);

  const _sumStyle = isOk ? S_SUM_OK : S_SUM_NOT_OK;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S_MSG,
      children: MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      style: S_P_SUM,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: n1 + " + " + n2 + " = "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _sumStyle,
        children: resultSum
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSlider.default, {
      onChange: _hChangeSlider
    })]
  });
});
var _default = MathCaptcha;
exports.default = _default;
//# sourceMappingURL=MathCaptcha.js.map