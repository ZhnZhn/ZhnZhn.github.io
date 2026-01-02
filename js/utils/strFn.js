"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.toPlural = exports.safeReplaceIn = exports.isTokenInStr = void 0;
var _isTypeFn = require("./isTypeFn");
const isTokenInStr = (str, token) => (str || '').indexOf(token) !== -1;
exports.isTokenInStr = isTokenInStr;
const toUpperCaseFirst = strOr => (0, _isTypeFn.isStr)(strOr) && strOr ? strOr[0].toUpperCase() + strOr.slice(1) : '';
exports.toUpperCaseFirst = toUpperCaseFirst;
const safeReplaceIn = (str, from, to) => (0, _isTypeFn.isStr)(str) ? str.replace(from, to) : '';
exports.safeReplaceIn = safeReplaceIn;
const toPlural = str => {
  if (!str) return str;
  const _lastIndex = str.length - 1;
  return str[_lastIndex] === 'y' ? str.slice(0, _lastIndex) + 'ies' : str + 's';
};
exports.toPlural = toPlural;
//# sourceMappingURL=strFn.js.map