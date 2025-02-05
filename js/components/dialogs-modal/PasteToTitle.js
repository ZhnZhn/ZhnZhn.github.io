"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const S_TITLE = {
    paddingBottom: 4,
    margin: '10px 6px 8px 8px',
    borderBottom: '2px solid black'
  },
  S_CHART_ID = {
    display: 'inline-block',
    color: '#a487d4',
    width: 240,
    verticalAlign: 'bottom',
    fontWeight: 'bold'
  };
const PasteToTitle = _ref => {
  let {
    text
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_TITLE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
      children: "From Chart:\xA0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CHART_ID,
      text: text
    })]
  });
};
var _default = exports.default = PasteToTitle;
//# sourceMappingURL=PasteToTitle.js.map