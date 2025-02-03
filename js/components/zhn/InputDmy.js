"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _SpanToken = require("./SpanToken");
var _DateField = _interopRequireDefault(require("./DateField"));
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_INPUT = {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  S_DATE_FIELD = {
    ..._Input.S_BOX_SHADOW,
    width: 120,
    marginLeft: 8
  },
  REQUIRED_DATE_FORMAT = "DD-MM-YYYY";
const InputDmy = _ref => {
  let {
    refEl,
    caption,
    initialValue,
    onTest = _dateFn.isDmy,
    onEnter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
    style: S_ROW_INPUT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
      refEl: refEl,
      style: S_DATE_FIELD,
      initialValue: initialValue,
      placeholder: REQUIRED_DATE_FORMAT,
      errorMsg: REQUIRED_DATE_FORMAT,
      onTest: onTest,
      onEnter: onEnter
    })]
  });
};
var _default = exports.default = InputDmy;
//# sourceMappingURL=InputDmy.js.map