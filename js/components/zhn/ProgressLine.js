"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRerender = _interopRequireDefault(require("../hooks/useRerender"));
var _jsxRuntime = require("react/jsx-runtime");
const CL = "progress-line",
  DF_COLOR = '#2f7ed8',
  TM_PERIOD = 800,
  WIDTH_TRANSITION = 'width 350ms linear';
const _crLineStyle = (backgroundColor, width, transition) => ({
  backgroundColor,
  width: width + '%',
  transition,
  opacity: 1
});
const _crCompleted = (completed, _refWasCompleted) => completed < 0 ? 0 : completed >= 100 ? ((0, _uiApi.setRefValue)(_refWasCompleted, true), 100) : completed;
const _crStyle = (_refWasCompleted, color, completed) => (0, _uiApi.getRefValue)(_refWasCompleted) ? ((0, _uiApi.setRefValue)(_refWasCompleted, false), _crLineStyle(color, 0)) : _crLineStyle(color, _crCompleted(completed, _refWasCompleted), WIDTH_TRANSITION);
const ProgressLine = _ref => {
  let {
    color = DF_COLOR,
    completed
  } = _ref;
  const rerender = (0, _useRerender.default)(),
    _refWasCompleted = (0, _uiApi.useRef)(false),
    _refIdCompleted = (0, _uiApi.useRef)(null);
  (0, _uiApi.useEffect)(() => {
    if ((0, _uiApi.getRefValue)(_refWasCompleted)) {
      (0, _uiApi.setRefValue)(_refIdCompleted, setTimeout(rerender, TM_PERIOD));
    }
  });
  (0, _uiApi.useEffect)(() => {
    return () => {
      clearTimeout((0, _uiApi.getRefValue)(_refIdCompleted));
    };
  }, []);
  const _style = _crStyle(_refWasCompleted, color, completed);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL,
    style: _style
  });
};
var _default = ProgressLine;
exports.default = _default;
//# sourceMappingURL=ProgressLine.js.map