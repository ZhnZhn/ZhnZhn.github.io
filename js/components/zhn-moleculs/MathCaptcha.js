"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
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
const _crRandomNumber = function (m, n) {
  if (m === void 0) {
    m = 0;
  }
  if (n === void 0) {
    n = 10;
  }
  return m + Math.floor((n - m + 1) * Math.random());
};
const _useRandomNumber = () => (0, _uiApi.useState)(() => _crRandomNumber(0, 10))[0];
const MathCaptcha = _ref => {
  let {
    refEl,
    style
  } = _ref;
  const n1 = _useRandomNumber(),
    n2 = _useRandomNumber(),
    [{
      isOk,
      resultSum
    }, setState] = (0, _uiApi.useState)({
      isOk: false,
      resultSum: ''
    })
    /* eslint-disable react-hooks/exhaustive-deps */,
    _hChangeSlider = (0, _uiApi.useCallback)(value => setState({
      isOk: n1 + n2 === value,
      resultSum: value
    }), []);
  /* eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useImperativeHandle)(refEl, () => ({
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
};
var _default = exports.default = MathCaptcha;
//# sourceMappingURL=MathCaptcha.js.map