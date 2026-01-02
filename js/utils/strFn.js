"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = void 0;
var _isTypeFn = require("./isTypeFn");
const toUpperCaseFirst = strOr => (0, _isTypeFn.isStr)(strOr) && strOr ? strOr[0].toUpperCase() + strOr.slice(1) : '';
exports.toUpperCaseFirst = toUpperCaseFirst;
//# sourceMappingURL=strFn.js.map