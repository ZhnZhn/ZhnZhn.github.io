"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var S = {
  STEP: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    lineHeight: '24px',
    width: 26,
    height: 26,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
};

var Step = function Step(_ref) {
  var _ref$step = _ref.step,
      step = _ref$step === void 0 ? '0' : _ref$step;
  return _react["default"].createElement("span", {
    style: S.STEP
  }, step);
};

var _default = Step;
exports["default"] = _default;
//# sourceMappingURL=Step.js.map