"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _SpanLabel = _interopRequireDefault(require("../zhn-span/SpanLabel"));

var _DateField = _interopRequireDefault(require("../zhn/DateField"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW_INPUT = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 8
},
      S_DATE_FIELD = {
  width: 120,
  marginLeft: 8,
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
},
      S_DIV_MSG = {
  marginTop: 6
},
      S_MSG = {
  color: '#f44336',
  fontWeight: 'bold'
};
const DivCompareTo = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    initialValue,
    msgErr,
    onTest,
    onEnter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: S_ROW_INPUT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanLabel.default, {
        label: "CompareTo:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
        ref: ref,
        style: S_DATE_FIELD,
        initialValue: initialValue,
        placeholder: "DD-MM-YYYY",
        errorMsg: "DD-MM-YYYY",
        onTest: onTest,
        onEnter: onEnter
      })]
    }), msgErr && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DIV_MSG,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_MSG,
        children: msgErr
      })
    })]
  });
});
var _default = DivCompareTo;
exports.default = _default;
//# sourceMappingURL=DivCompareTo.js.map