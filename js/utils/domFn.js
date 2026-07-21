"use strict";

exports.__esModule = true;
exports.isSupportOptions = exports.escapeStrHtml = exports.escapeNumberOr = void 0;
var _isTypeFn = require("./isTypeFn");
const _reEscapeHtml = /[<>&"]/g,
  HP_ESCAPE_HTML = Object.create(null);
HP_ESCAPE_HTML['<'] = '&lt;';
HP_ESCAPE_HTML['>'] = '&gt;';
HP_ESCAPE_HTML['&'] = '&amp;';
HP_ESCAPE_HTML['"'] = '&quot;';
Object.freeze(HP_ESCAPE_HTML);
const escapeStrHtml = str => (0, _isTypeFn.isStr)(str) ? str.replace(_reEscapeHtml, ch => HP_ESCAPE_HTML[ch] || ch) : '';
exports.escapeStrHtml = escapeStrHtml;
const escapeNumberOr = v => (0, _isTypeFn.isNumber)(v) ? '' + v : escapeStrHtml(v);
exports.escapeNumberOr = escapeNumberOr;
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