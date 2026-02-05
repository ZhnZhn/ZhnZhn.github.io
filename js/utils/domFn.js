"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isSupportOptions = exports.domSanitize = void 0;
var _dompurify = _interopRequireDefault(require("dompurify"));
var _isTypeFn = require("./isTypeFn");
//only HTML { USE_PROFILES: { html: true } }, not SVG and MathML
const _sanitize = _dompurify.default.sanitize;
const domSanitize = str => _sanitize(str, {
  USE_PROFILES: {
    html: true
  }
});
exports.domSanitize = domSanitize;
let _isSupportOptions;
const onceOptions = {
  get once() {
    _isSupportOptions = true;
    return true;
  }
};
const isSupportOptions = () => {
  if ((0, _isTypeFn.isBool)(_isSupportOptions)) {
    return _isSupportOptions;
  }
  try {
    window.addEventListener('test', onceOptions, onceOptions);
    window.removeEventListener('test', onceOptions, onceOptions);
  } catch {
    _isSupportOptions = false;
  }
  return _isSupportOptions;
};
exports.isSupportOptions = isSupportOptions;
//# sourceMappingURL=domFn.js.map