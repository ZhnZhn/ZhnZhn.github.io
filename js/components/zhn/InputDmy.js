"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _styleFn = require("../styleFn");
var _SpanToken = require("./SpanToken");
var _DateField = _interopRequireDefault(require("./DateField"));
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_INPUT = {
    ..._styleFn.S_FLEX,
    alignItems: 'center',
    marginTop: 8
  },
  S_DATE_FIELD = {
    ..._Input.S_BOX_SHADOW,
    width: 120,
    marginLeft: 8
  },
  REQUIRED_DATE_FORMAT = "DD-MM-YYYY";
const InputDmy = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
  style: S_ROW_INPUT,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
    children: props.caption
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
    refEl: props.refEl,
    style: S_DATE_FIELD,
    initialValue: props.initialValue,
    placeholder: REQUIRED_DATE_FORMAT,
    errorMsg: REQUIRED_DATE_FORMAT,
    onTest: props.onTest || _dateFn.isDmy,
    onEnter: props.onEnter
  })]
});
var _default = exports.default = InputDmy;
//# sourceMappingURL=InputDmy.js.map