"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var DivHtml = (0, _react.memo)(function (_ref) {
  var str = _ref.str,
      className = _ref.className,
      style = _ref.style;

  var __html = _dompurify["default"].sanitize(str);

  if (!__html) {
    return null;
  }

  return _react["default"].createElement("div", {
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