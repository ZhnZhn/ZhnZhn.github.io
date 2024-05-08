"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../zhn/SpanToken");
var _DateField = _interopRequireDefault(require("../zhn/DateField"));
var _Input = require("../zhn/Input.Style");
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
  S_MT_6 = {
    marginTop: 6
  };
const DivCompareTo = _ref => {
  let {
    refEl,
    initialValue,
    msgErr,
    onTest,
    onEnter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: S_ROW_INPUT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanLabel, {
        children: "CompareTo:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
        ref: refEl,
        style: S_DATE_FIELD,
        initialValue: initialValue,
        placeholder: "DD-MM-YYYY",
        errorMsg: "DD-MM-YYYY",
        onTest: onTest,
        onEnter: onEnter
      })]
    }), msgErr && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_MT_6,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _Input.S_ERR,
        children: msgErr
      })
    })]
  });
};
var _default = exports.default = DivCompareTo;
//# sourceMappingURL=DivCompareTo.js.map