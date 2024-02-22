"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = void 0;
var _isTypeFn = require("./isTypeFn");
const toUpperCaseFirst = v => (0, _isTypeFn.isStr)(v) && v ? v[0].toUpperCase() + v.slice(1) : '';
exports.toUpperCaseFirst = toUpperCaseFirst;
//# sourceMappingURL=toUpperCaseFirst.js.map