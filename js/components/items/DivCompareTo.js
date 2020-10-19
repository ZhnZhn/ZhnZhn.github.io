"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _SpanLabel = _interopRequireDefault(require("../zhn-span/SpanLabel"));

var _DateField = _interopRequireDefault(require("../zhn/DateField"));

var S = {
  ROW_INPUT: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  DATE_FIELD: {
    width: 120,
    marginLeft: 8,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  DIV_MSG: {
    marginTop: 6
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};
var DivCompareTo = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var initialValue = _ref.initialValue,
      msgErr = _ref.msgErr,
      onTest = _ref.onTest,
      onEnter = _ref.onEnter;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: S.ROW_INPUT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanLabel["default"], {
        label: "CompareTo:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
        ref: ref,
        style: S.DATE_FIELD,
        initialValue: initialValue,
        placeholder: "DD-MM-YYYY",
        errorMsg: "DD-MM-YYYY",
        onTest: onTest,
        onEnter: onEnter
      })]
    }), msgErr && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.DIV_MSG,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.MSG,
        children: msgErr
      })
    })]
  });
});
var _default = DivCompareTo;
exports["default"] = _default;
//# sourceMappingURL=DivCompareTo.js.map