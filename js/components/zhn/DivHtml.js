"use strict";

exports.__esModule = true;
exports.default = void 0;
var _domSanitize = require("../../utils/domSanitize");
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const DivHtml = (0, _uiApi.memo)(props => {
  const __html = (0, _domSanitize.domSanitize)(props.str);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
    v: __html,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: props.className,
      style: props.style,
      dangerouslySetInnerHTML: {
        __html
      }
    })
  });
});
DivHtml.isHtml = str => Boolean((0, _domSanitize.domSanitize)(str));
var _default = exports.default = DivHtml;
//# sourceMappingURL=DivHtml.js.map