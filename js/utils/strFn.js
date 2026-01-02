"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.safeReplaceIn = void 0;
var _isTypeFn = require("./isTypeFn");
const toUpperCaseFirst = strOr => (0, _isTypeFn.isStr)(strOr) && strOr ? strOr[0].toUpperCase() + strOr.slice(1) : '';
exports.toUpperCaseFirst = toUpperCaseFirst;
const safeReplaceIn = (str, from, to) => (0, _isTypeFn.isStr)(str) ? str.replace(from, to) : '';
exports.safeReplaceIn = safeReplaceIn;
//# sourceMappingURL=strFn.js.map