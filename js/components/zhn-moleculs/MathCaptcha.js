"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _mathFn = require("../../math/mathFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
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
  S_SUM_OK = (0, _styleFn.crColorStyle)('#4caf50'),
  S_SUM_NOT_OK = (0, _styleFn.crColorStyle)('#f44336');
const useRandomNumber = () => (0, _uiApi.useState)(() => (0, _mathFn.crRandomInteger)(0, 10))[0];
const MathCaptcha = props => {
  const n1 = useRandomNumber(),
    n2 = useRandomNumber(),
    [state, setState] = (0, _uiApi.useState)([!1, '']),
    [isOk, resultSum] = state,
    _hChangeSlider = (0, _uiApi.useCallback)(value => setState([n1 + n2 === value, value]), [n1, n2]);
  (0, _uiApi.useImperativeHandle)(props.refEl, () => ({
    isOk: () => isOk
  }), [isOk]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: props.style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S_MSG,
      children: MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      style: S_P_SUM,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: `${n1} + ${n2} = `
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: isOk ? S_SUM_OK : S_SUM_NOT_OK,
        children: resultSum
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSlider.default, {
      onChange: _hChangeSlider
    })]
  });
};
var _default = exports.default = MathCaptcha;
//# sourceMappingURL=MathCaptcha.js.map