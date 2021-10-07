"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const S_STEP = {
  display: 'inline-block',
  color: '#80c040',
  lineHeight: '24px',
  width: 26,
  height: 26,
  border: '2px solid #80c040',
  borderRadius: '50%',
  textAlign: 'center',
  textTransform: 'uppercase'
};

const StepTitle = ({
  step,
  title
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S_STEP,
    children: step
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    children: ["\xA0", title, "."]
  })]
});

var _default = StepTitle;
exports.default = _default;
//# sourceMappingURL=StepTitle.js.map