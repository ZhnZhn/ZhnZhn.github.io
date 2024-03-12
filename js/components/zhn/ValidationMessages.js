"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _StepTitles = _interopRequireDefault(require("./StepTitles"));
var _jsxRuntime = require("react/jsx-runtime");
const MSG_COLOR = "#f44336",
  S_VM = {
    color: MSG_COLOR,
    paddingLeft: 10,
    paddingTop: 4,
    fontWeight: "bold",
    lineHeight: 1.4
  },
  S_VM_MSG_NUMBER = (0, _styleFn.crStepStyle)(MSG_COLOR);
const ValidationMessages = _ref => {
  let {
    validationMessages
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitles.default, {
    style: S_VM,
    stepStyle: S_VM_MSG_NUMBER,
    titles: validationMessages
  });
};
var _default = exports.default = ValidationMessages;
//# sourceMappingURL=ValidationMessages.js.map