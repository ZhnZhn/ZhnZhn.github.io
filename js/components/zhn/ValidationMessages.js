"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Color = require("../../constants/Color");
var _StepTitles = _interopRequireDefault(require("./StepTitles"));
var _jsxRuntime = require("react/jsx-runtime");
const S_VM = {
  color: _Color.COLOR_RED,
  paddingLeft: 10,
  paddingTop: 4,
  fontWeight: "bold",
  lineHeight: 1.4
};
const ValidationMessages = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitles.default, {
  style: S_VM,
  titles: props.validationMessages
});
var _default = exports.default = ValidationMessages;
//# sourceMappingURL=ValidationMessages.js.map