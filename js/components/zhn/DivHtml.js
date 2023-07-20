"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));
var _jsxRuntime = require("react/jsx-runtime");
const DivHtml = (0, _uiApi.memo)(_ref => {
  let {
    str,
    className,
    style
  } = _ref;
  const __html = (0, _domSanitize.default)(str);
  return __html ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: style,
    dangerouslySetInnerHTML: {
      __html
    }
  }) : null;
});
DivHtml.isHtml = str => Boolean((0, _domSanitize.default)(str));
var _default = DivHtml;
exports.default = _default;
//# sourceMappingURL=DivHtml.js.map