"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const OptionsFooter = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: _CL.CL_FOOTER,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: _CL.CL_FOOTER_INDEX,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: props.refIndexNode,
      children: props.indexActiveOption
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [": ", props.nFiltered, ": ", props.nAll]
    })]
  }), !props.noFooterBts && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: _CL.CL_FOOTER_BTS,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: _CL.CL_FOOTER_BT,
      onClick: props.onClear,
      children: "CL"
    })
  })]
});
var _default = exports.default = OptionsFooter;
//# sourceMappingURL=OptionsFooter.js.map