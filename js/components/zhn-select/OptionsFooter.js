"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _BtSvgX = require("../zhn/BtSvgX");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_BT_X = {
  backgroundColor: '#e1e1cb',
  height: '32px',
  padding: '6px',
  stroke: _CL.COLOR_OPTIONS_OPEN,
  borderRadius: '50%'
};
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
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
    v: !props.noFooterBts,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _CL.CL_FOOTER_BTS,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        "aria-label": "Clear input and close options",
        style: S_BT_X,
        onClick: props.onClear,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.SvgX, {})
      })
    })
  })]
});
var _default = exports.default = OptionsFooter;
//# sourceMappingURL=OptionsFooter.js.map