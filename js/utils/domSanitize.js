"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.domSanitize = void 0;
var _dompurify = _interopRequireDefault(require("dompurify"));
//only HTML { USE_PROFILES: { html: true } }, not SVG and MathML
const _sanitize = _dompurify.default.sanitize;
const domSanitize = str => _sanitize(str, {
  USE_PROFILES: {
    html: true
  }
});
exports.domSanitize = domSanitize;
//# sourceMappingURL=domSanitize.js.map