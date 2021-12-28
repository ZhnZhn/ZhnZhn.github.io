"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var STEP_COLOR = '#80c040',
    S_PB_4 = {
  paddingBottom: 4
},
    S_STEP = {
  display: 'inline-block',
  color: STEP_COLOR,
  width: 26,
  height: 26,
  border: "2px solid " + STEP_COLOR,
  borderRadius: '50%',
  textAlign: 'center',
  textTransform: 'uppercase'
};

var StepTitle = function StepTitle(_ref) {
  var step = _ref.step,
      title = _ref.title;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    style: S_PB_4,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_STEP,
      children: step
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["\xA0", title, "."]
    })]
  });
};

var _default = StepTitle;
exports.default = _default;
//# sourceMappingURL=StepTitle.js.map