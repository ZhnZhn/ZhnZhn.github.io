"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _dompurify = _interopRequireDefault(require("dompurify"));

var DivHtml = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var str = _ref.str,
      className = _ref.className,
      style = _ref.style;

  var __html = _dompurify["default"].sanitize(str);

  if (!__html) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: style,
    dangerouslySetInnerHTML: {
      __html: __html
    }
  });
});

DivHtml.isHtml = function (str) {
  return Boolean(_dompurify["default"].sanitize(str));
};

var _default = DivHtml;
exports["default"] = _default;
//# sourceMappingURL=DivHtml.js.map