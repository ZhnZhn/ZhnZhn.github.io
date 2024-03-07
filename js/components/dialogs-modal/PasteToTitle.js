"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const S_TITLE = {
    paddingBottom: 4,
    margin: '0 0 8px 16px',
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  S_CHART_ID = {
    display: 'inline-block',
    color: '#a487d4',
    width: 200,
    verticalAlign: 'bottom'
  };
const PasteToTitle = _ref => {
  let {
    chartId
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_TITLE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
      children: "From Chart:\xA0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CHART_ID,
      text: chartId
    })]
  });
};
var _default = exports.default = PasteToTitle;
//# sourceMappingURL=PasteToTitle.js.map