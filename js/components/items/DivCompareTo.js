"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputDmy = _interopRequireDefault(require("../zhn/InputDmy"));
var _Input = require("../zhn/Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_MT_6 = {
  marginTop: 6
};
const DivCompareTo = _ref => {
  let {
    refEl,
    initialValue,
    msgErr,
    onEnter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputDmy.default, {
      refEl: refEl,
      caption: "CompareTo:",
      initialValue: initialValue,
      onEnter: onEnter
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